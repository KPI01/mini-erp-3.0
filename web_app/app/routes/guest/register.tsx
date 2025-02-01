import { Eye, EyeOff, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useFetcher, type MetaFunction } from "react-router";
import Input from "~/components/forms/Input";
import type { Route } from "./+types/register";
import { sessionExists } from "~/server/auth/session";
import { HideIcon, ShowIcon } from "~/components/icons";
import { register } from "~/server/auth/register";
import { cleanErrors } from "~/helpers/utils";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Registro de usuario",
      description: "Registrar un usuario para la plataforma.",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionExists(request);

  if (session) throw redirect("/app");
}

export async function action({ request }: Route.ActionArgs) {
  return register(request);
}

export default function RegisterForm() {
  console.log("RegisterForm");
  const { data, Form } = useFetcher();
  if (data?.errors) console.error("errors:", data.errors);

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

  return (
    <div className="card">
      <h1>Tu Sistema ERP</h1>
      <p className="card-description">
        Formulario para agregar un usuario a la aplicación.
      </p>
      <Form
        className="mt-4 grid grid-cols-2 gap-4"
        method="post"
        action="/guest/register"
      >
        <Input
          label="Nombre"
          input={{
            type: "text",
            name: "name",
          }}
          errors={cleanErrors("name", data?.errors)}
        />
        <Input
          label="Usuario"
          input={{
            type: "text",
            name: "username",
          }}
          errors={cleanErrors("username", data?.errors)}
        />
        <Input
          label="Correo"
          containerClass="col-span-full"
          input={{
            type: "email",
            name: "email",
          }}
          errors={cleanErrors("email", data?.errors)}
        />
        <Input
          label="Contraseña"
          containerClass="col-span-full"
          input={{
            type: visibility.password ? "text" : "password",
            className: "basis-full",
            name: "password",
          }}
          btn={{
            type: "button",
            className: "btn btn-outline-lightBlue",
            onClick: () =>
              setVisibility({ ...visibility, password: !visibility.password }),
          }}
          icon={visibility.password ? <ShowIcon /> : <HideIcon />}
          errors={cleanErrors("password", data?.errors)}
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
            className: "btn btn-outline-lightBlue",
            onClick: () =>
              setVisibility({
                ...visibility,
                confirmation: !visibility.confirmation,
              }),
          }}
          icon={visibility.confirmation ? <ShowIcon /> : <HideIcon />}
          errors={cleanErrors("confirmation", data?.errors)}
        />
        <div className="col-span-full flex justify-between mt-4">
          <button
            type="submit"
            className="btn btn-darkBlue text-white hover:bg-(--mediumBlue) font-semibold ms-auto"
          >
            <span>Enviar</span>
            <SendIcon />
          </button>
        </div>
      </Form>
    </div>
  );
}
