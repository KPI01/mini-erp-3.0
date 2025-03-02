import { data, Form, type MetaFunction, Link as Anchor } from "react-router";
import { InputField } from "~/components/forms/input";
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
  Spinner,
  Text,
} from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { CardDescription, Header } from "./components";
import { validateSessionErrors } from "~/server/form-validation.server";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { Route } from "./+types/login";

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
    },
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
      <Grid asChild gapY="5" mt="6">
        <Form
          method="post"
          action="/guest/login"
          className="mt-4"
          onSubmit={() => form.handleSubmit()}
        >
          <form.Field
            name="username"
            children={({ name, state, handleBlur, handleChange }) => (
              <InputField
                label="Usuario"
                input={{
                  type: "text",
                  id: name,
                  name: name,
                  value: state.value,
                  onBlur: handleBlur,
                  onChange: (e) => handleChange(e.target.value),
                }}
                errors={{ field: name, bag: errors }}
              />
            )}
          />
          <form.Field
            name="password"
            children={({ name, state, handleBlur, handleChange }) => (
              <InputField
                label="Contraseña"
                icon={{
                  children: visible ? <EyeOpenIcon /> : <EyeClosedIcon />,
                  stateHandler: () => toggleVisible(visible),
                }}
                input={{
                  type: visible ? "text" : "password",
                  id: name,
                  name: name,
                  value: state.value,
                  onBlur: handleBlur,
                  onChange: (e) => handleChange(e.target.value),
                }}
                errors={{ field: name, bag: errors }}
              />
            )}
          />
          <Flex>
            <Link asChild>
              <Anchor to="/guest/register">Crear cuenta</Anchor>
            </Link>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  size="3"
                  type="submit"
                  className="!ms-auto"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? <Spinner /> : "Enviar"}
                </Button>
              )}
            />
          </Flex>
        </Form>
      </Grid>
    </Box>
  );
}
