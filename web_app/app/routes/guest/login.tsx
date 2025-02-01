import {
  Form,
  Link,
  redirect,
  type MetaFunction,
} from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/login";
import Input from "~/components/forms/Input";
import { HideIcon, SendIcon, ShowIcon } from "~/components/icons";
import { getSession } from "~/server/session.server";
import { login } from "~/server/auth.server";

export const meta: MetaFunction = () => {
  return [ { title: "Login", description: "Iniciar sesión en la plataforma" } ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  console.info("session:", session);

  if (session.has("user")) throw redirect("/app");
}

export async function action({ request }: Route.ActionArgs) {
  await login(request);
}

export default function LoginForm() {
  console.log("LoginForm");
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
