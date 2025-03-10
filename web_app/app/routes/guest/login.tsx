import { data, type MetaFunction, Link as Anchor, useSubmit } from "react-router";
import { getSession } from "~/server/session.server";
import { login } from "~/server/auth.server";
import {
  Box,
  Button,
  Em,
  Flex,
  Grid,
  IconButton,
  Link,
  Text,
} from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { CardDescription, Header } from "./components";
import { validateSessionErrors } from "~/server/form-validation.server";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { Route } from "./+types/login";
import { loginSchema, type loginSchemaType } from "./auth-forms";
import { InputField } from "~/components/forms/input";

export const meta: MetaFunction = () => {
  return [{ title: "Login", description: "Iniciar sesión en la plataforma" }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const errors = await validateSessionErrors({ session, key: "zodErrors" });
  if (errors !== undefined) return data(...errors);
}

export async function action({ request }: Route.ActionArgs) {
  return await login(request);
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit()
  console.log("LoginForm");
  //@ts-ignore
  const errors = loaderData?.zodErrors;
  console.debug("errors:", errors);

  const [visible, setVisible] = useState(false);
  const toggleVisible = (value: typeof visible) => setVisible(!value);
  console.debug("visible:", visible);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    } satisfies loginSchemaType,
    validators: { onSubmit: loginSchema },
    onSubmit: ({ value }) => {
      console.debug(value)
      const formData = new FormData()
      const keys = Object.keys(value)
      const values = Object.values(value)
      keys.map((k, ix) => formData.append(k, String(values[ix])))

      submit(formData, {
        action: "/guest/login",
        method: "post"
      })
    }
  });

  return (
    <Box>
      <Header>ARMF</Header>
      <CardDescription>
        <Flex direction="column" gapY="2">
          <Em>Administrador de Recursos Materiales y Financieros.</Em>
          <Text as="p" weight="light" wrap="pretty" size="2">
            Ingresa tus credenciales para poder acceder a la aplicación.
          </Text>
        </Flex>
      </CardDescription>
      <Grid gapY="5" mt="6">
        <form.Field
          name="username"
          children={(field) => (
            <InputField
              label="Usuario"
              input={{
                type: "text",
                name: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value),
              }}
              fieldMeta={field.state.meta}
            />
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <InputField
              label={{
                main: "Contraseña",
                suffix: <IconButton color="gray" variant="ghost" onClick={() => setVisible(!visible)}>
                  {!visible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </IconButton>
              }}
              input={{
                type: visible ? "text" : "password",
                name: field.name,
                value: field.state.value,
                onBlur: field.handleBlur,
                onChange: (e) => field.handleChange(e.target.value),
              }}
              fieldMeta={field.state.meta}
            />
          )}
        />
        <Flex>
          <Link asChild>
            <Anchor to="/guest/register">Crear cuenta</Anchor>
          </Link>
          <Button
            size="3"
            type="button"
            className="!ms-auto"
            onClick={() => form.handleSubmit()}
          >
            Enviar
          </Button>
        </Flex>
      </Grid>
    </Box>
  );
}
