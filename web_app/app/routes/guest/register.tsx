import { useEffect, useState } from "react";
import { data, Form, Link as LinkRR, type MetaFunction } from "react-router";
import Input from "~/components/forms/input";
import type { Route } from "./+types/register";
import { cleanErrors } from "~/helpers/utils";
import { register } from "~/server/auth.server";
import { validateAuthSession } from "~/server/session.server";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Button, Em, Flex, Grid, Link } from "@radix-ui/themes";
import { CardDescription, Header } from "./components";
import { validateSessionErrors } from "~/server/form-validation.server";

export const meta: MetaFunction = () => {
  return [{ title: "Registro de usuario", description: "Registrar un usuario para la plataforma.", }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await validateAuthSession({ request })

  const errors = await validateSessionErrors({ session, key: "zodErrors" })
  if (errors !== undefined) return data(...errors)
}

export async function action({ request }: Route.ActionArgs) {
  return register(request);
}

export default function Register({ loaderData }: Route.ComponentProps) {
  console.log("RegisterForm");
  const errors = loaderData?.zodErrors
  console.debug("errors:", errors)

  const [visibility, setVisibility] = useState<{
    password: boolean;
    confirmation: boolean;
  }>({
    password: false,
    confirmation: false,
  });

  useEffect(() => {
    if (visibility.confirmation || visibility.password) {
      setTimeout(
        () =>
          setVisibility({
            password: false,
            confirmation: false,
          }),
        2500
      );
    }
  }, [setVisibility]);

  const handleIcon = (val: boolean) => {
    if (!val) return <EyeClosedIcon />
    return <EyeOpenIcon />
  }

  return (
    <Box>
      <Header>Tu Sistemas ERP</Header>
      <CardDescription>
        Formulario para <Em>agregar un usuario</Em> a la aplicación.
      </CardDescription>
      <Box className="my-4" asChild>
        <Form
          method="post"
          action="/guest/register"
        >
          <Grid className="px-3" align="center" justify="center" columns="1" gapY="4">
            <Input
              label="Nombre"
              input={{
                type: "text",
                name: "name",
              }}
              errors={cleanErrors("name", errors)}
            />
            <Input
              label="Usuario"
              input={{
                type: "text",
                name: "username"
              }}
              errors={cleanErrors("username", errors)}
            />
            <Input
              label="Correo"
              input={{
                type: "email",
                name: "email",
              }}
              errors={cleanErrors("email", errors)}
              description="Los dominios permitidos son: 'gmail.com', 'outlook.com', 'hotmail.com' y 'yahoo.com'"
            />
            <Input
              label="Contraseña"
              input={{
                type: visibility.password ? "text" : "password",
                name: "password",
              }}
              btn={{
                type: "button",
                icon: handleIcon(visibility.password),
                onClick: () =>
                  setVisibility({ ...visibility, password: !visibility.password }),
              }}
              icon={visibility.password ? <EyeOpenIcon /> : <EyeClosedIcon />}
              errors={cleanErrors("password", errors)}
              description="La clave debe tener al menos: 1 minúscula, 1 mayúscula, 1 símbolo y 8 caracteres"

            />
            <Input
              label="Confirmación de contraseña"
              containerClass="col-span-full"
              input={{
                type: visibility.confirmation ? "text" : "password",
                className: "basis-full",
                name: "confirmation",
              }}
              btn={{
                type: "button",
                icon: handleIcon(visibility.confirmation),
                onClick: () =>
                  setVisibility({
                    ...visibility,
                    confirmation: !visibility.confirmation,
                  }),
              }}
              errors={cleanErrors("confirmation", errors)}
            />
          </Grid>
          <Flex className="mt-10" align="center" justify="between">
            <Flex className="text-sm">
              <Link asChild>
                <LinkRR to="/guest/login" className="link">Volver a inicio de sesión</LinkRR>
              </Link>
            </Flex>
            <Button
              type="submit"
              className="btn btn-darkBlue text-white hover:bg-(--mediumBlue) font-semibold ms-auto"
            >
              Registrar
            </Button>
          </Flex>
        </Form>
      </Box>
    </Box>
  );
}
