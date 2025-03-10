import { useState } from "react";
import { data, Link as LinkRR, useSubmit, type MetaFunction } from "react-router";
import type { Route } from "./+types/register";
import { register } from "~/server/auth.server";
import { getSession } from "~/server/session.server";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Button, Em, Flex, Grid, Link } from "@radix-ui/themes";
import { CardDescription, Header } from "./components";
import { validateSessionErrors } from "~/server/form-validation.server";
import { useForm } from "@tanstack/react-form";
import { InputField } from "~/components/forms/input";
import { registerSchema } from "./auth-forms";
import type { z } from "zod";

export const meta: MetaFunction = () => {
  return [{ title: "Registro de usuario", description: "Registrar un usuario para la plataforma.", }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  const errors = await validateSessionErrors({ session, key: "zodErrors" })
  if (errors !== undefined) return data(...errors)
}

export async function action({ request }: Route.ActionArgs) {
  return register(request);
}

export default function Register({ }: Route.ComponentProps) {
  const submit = useSubmit()
  console.log("RegisterForm");

  const [visible, setVisible] = useState<{
    password: boolean;
    confirmation: boolean;
  }>({
    password: false,
    confirmation: false,
  });

  const handleIcon = (val: boolean) => {
    if (!val) return <EyeClosedIcon />
    return <EyeOpenIcon />
  }

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmation: ""
    } satisfies z.infer<typeof registerSchema>,
    validators: { onSubmit: registerSchema },
    onSubmit: ({ value }) => {
      const formData = new FormData()
      const keys = Object.keys(value)
      const values = Object.values(value)
      keys.map((k, ix) => formData.append(k, values[ix]))

      submit(formData, {
        action: "/guest/register",
        method: "post"
      })

    }
  })

  return (
    <Box>
      <Header>Tu Sistemas ERP</Header>
      <CardDescription>
        Formulario para <Em>agregar un usuario</Em> a la aplicación.
      </CardDescription>
      <Grid className="px-3" align="center" justify="center" columns="1" gapY="4">
        <form.Field
          name="name"
          children={(field) => (
            <InputField
              label="Nombre"
              input={{
                type: "text",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value)
              }}
              fieldMeta={field.state.meta}
            />
          )} />
        <form.Field
          name="username"
          children={(field) => (
            <InputField
              label="Usuario"
              input={{
                type: "text",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value)
              }}
              fieldMeta={field.state.meta}
            />
          )} />
        <form.Field
          name="email"
          children={(field) => (
            <InputField
              label="Correo"
              description="Los dominions aceptados son: 'gmail.com', 'outlook.com', 'hotmail.com' y 'yahoo.com'"
              input={{
                type: "email",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value)
              }}
              fieldMeta={field.state.meta}
            />
          )} />
        <form.Field
          name="password"
          children={(field) => (
            <InputField
              label="Contraseña"
              description="Debe tener al menos: 1 minúscula, 1 mayúscula, 1 numero y 1 símbolo especial y 8 caracteres"
              input={{
                type: visible.password ? "text" : "password",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value)
              }}
              icon={{
                children: handleIcon(visible.password),
                stateHandler: () => setVisible({ ...visible, password: !visible.password })
              }}
              fieldMeta={field.state.meta}
            />
          )} />
        <form.Field
          name="confirmation"
          children={(field) => (
            <InputField
              label="Confirmación de la contraseña"
              input={{
                type: visible.confirmation ? "text" : "password",
                name: field.name,
                id: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value)
              }}
              fieldMeta={field.state.meta}
            />
          )} />
      </Grid>
      <Flex className="mt-10" align="center" justify="between">
        <Flex className="text-sm">
          <Link asChild>
            <LinkRR to="/guest/login" className="link">Volver a inicio de sesión</LinkRR>
          </Link>
        </Flex>
        <form.Subscribe
          children={() => (
            <Button
              type="submit"
              className="btn btn-darkBlue text-white hover:bg-(--mediumBlue) font-semibold ms-auto"
              onClick={() => form.handleSubmit()}
            >
              Registrar
            </Button>
          )} />
      </Flex>
    </Box>
  );
}
