import type React from "react";
import { classMixer } from "~/helpers/utils";

interface InputProps {
  label?: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: React.ReactNode;
  containerClass?: string;
  errors?: string[];
}

export default function Input({
  label,
  input,
  btn,
  icon,
  containerClass,
  errors,
}: InputProps) {
  return (
    <div className={classMixer("form-control", containerClass ?? "")}>
      {label && <label htmlFor={input.name}>{label}</label>}
      {icon && btn ? (
        <div className="flex gap-3">
          <input {...input} />
          <button {...btn}>{icon}</button>
        </div>
      ) : (
        <input {...input} />
      )}
      {errors && errors.length > 0 && (
        <div className="text-xs mt-2">
          <span className="font-semibold text-(--alertRed)  ">
            Han ocurrido los siguientes errores:
          </span>
          <ul className="list-disc ms-6">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
