import {
  data,
  Form,
  Link as LinkRR,
  type MetaFunction,
} from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/login";
import Input from "~/components/forms/input";
import { getSession } from "~/server/session.server";
import { login } from "~/server/auth.server";
import { cleanErrors } from "~/helpers/utils";
import { Box, Button, Em, Flex, Grid, Link, Text } from "@radix-ui/themes";
import { Form as F } from "radix-ui"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { CardDescription, Header } from "./components";
import { validateSessionErrors } from "~/server/form-validation.server";

export const meta: MetaFunction = () => {
  return [{ title: "Login", description: "Iniciar sesión en la plataforma" }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  const errors = await validateSessionErrors({ session, key: "zodErrors" })
  if (errors !== undefined) return data(...errors)
}

export async function action({ request }: Route.ActionArgs) {
  return await login(request);
}

export default function Login({ loaderData }: Route.ComponentProps) {
  console.log("LoginForm");
  const errors = loaderData?.zodErrors
  console.debug("errors:", errors)

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    if (showPassword) {
      setTimeout(() => {
        setShowPassword(false);
      }, 2500);
    }
  };

  useEffect(() => {
    handlePasswordVisibility();
  }, [showPassword]);

  return (
    <Box>
      <Header>Tu Sistema ERP</Header>
      <CardDescription>
        Bienvenido al sistema de tu empresa, por favor <Em>ingresa tus credenciales</Em> para acceder al sistema.
      </CardDescription>
      <F.Root className="my-4" asChild>
        <Form
          method="post"
          action="/guest/login"
        >
          <Grid className="px-3" align="center" justify="center" columns="1" gapY="4">
            <Input
              label="Usuario"
              input={{
                type: "text",
                name: "username"
              }}
              errors={cleanErrors("username", errors)}
            />
            <Input
              label="Contraseña"
              input={{
                type: showPassword ? "text" : "password",
                id: "password",
                name: "password",
              }}
              btn={{
                icon: (showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />),
                type: "button",
                onClick: () => setShowPassword(!showPassword),
              }}
              errors={cleanErrors("password", errors)}
            />
          </Grid>
          <Flex align="center" justify="between" className="mt-8">
            <Flex direction="column" className="text-sm">
              <Text as="span">¿No tienes cuenta?</Text>
              <Link asChild>
                <LinkRR to="/guest/register">Crea una aquí</LinkRR>
              </Link>
            </Flex>
            <Button type="submit">Ingresar</Button>
          </Flex>
        </Form>
      </F.Root>
    </Box >
  );
}
