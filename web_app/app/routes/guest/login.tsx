import {
  data,
  Form,
  Link,
  redirect,
  type MetaFunction,
} from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/login";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Input from "~/components/forms/Input";
import { HideIcon, SendIcon, ShowIcon } from "~/components/icons";
=======
import Input from "~/components/forms/input";
>>>>>>> Stashed changes
=======
import Input from "~/components/forms/input";
>>>>>>> Stashed changes
import { commitSession, getSession } from "~/server/session.server";
import { login } from "~/server/auth.server";
import { cleanErrors } from "~/helpers/utils";

export const meta: MetaFunction = () => {
  return [ { title: "Login", description: "Iniciar sesión en la plataforma" } ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("user")) throw redirect("/app", { status: 300 })

  if (session.has("zodErrors")) {
    console.debug("se han encontrado errores")
    return data(
      { "zodErrors": session.get("zodErrors") },
      {
        headers: {
          "Set-Cookie": await commitSession(session)
        }
      }
    )
  }
}

export async function action({ request }: Route.ActionArgs) {
  return await login(request);
}

export default function Login({ loaderData }: Route.ComponentProps) {
  console.log("LoginForm");
  const errors = loaderData?.zodErrors
  console.debug("errors:", errors)

  const [ showPassword, setShowPassword ] = useState(false);

  const handlePasswordVisibility = () => {
    if (showPassword) {
      setTimeout(() => {
        setShowPassword(false);
      }, 2500);
    }
  };

  useEffect(() => {
    handlePasswordVisibility();
  }, [ showPassword ]);

  return (
    <div className="card max-w-md">
      <h1>Tu Sistema ERP</h1>
      <p className="card-description">
        Bienvenido al sistema de tu empresa, por favor ingresa tus credenciales
        para acceder al sistema.
      </p>
      <Form
        className="mt-4 grid grid-rows-2"
        method="post"
        action="/guest/login"
      >
        <Input
          label="Usuario"
          input={{
            type: "text",
            id: "username",
            name: "username",
          }}
          errors={cleanErrors("username", errors)}
        />
        <Input
          label="Contraseña"
          input={{
            type: showPassword ? "text" : "password",
            id: "password",
            name: "password",
            className: "basis-full",
          }}
          btn={{
            type: "button",
            className: "btn btn-outline-lightBlue",
            onClick: () => setShowPassword(!showPassword),
          }}
          icon={showPassword ? <ShowIcon /> : <HideIcon />}
          errors={cleanErrors("password", errors)}
        />
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <span>¿No tienes cuenta?</span>
            <Link to="/guest/register" className="link">Crea una aquí</Link>
          </div>
          <button
            type="submit"
            className="btn btn-darkBlue hover:bg-(--mediumBlue) text-white gap-3 text-lg font-bold"
          >
            Ingresar
            <SendIcon />
          </button>
        </div>
      </Form>
    </div>
  );
}
