import type { User } from "@prisma/client";
import type { EyeClosedIcon, } from "@radix-ui/react-icons";
import type { Button, IconButton, Checkbox, ButtonProps, AlertDialog } from "@radix-ui/themes";
import type { Column, ColumnDef } from "@tanstack/react-table";
import type { Routes } from "./session";
import { Form } from "radix-ui";
import type { Dispatch } from "react";

type TriggerButton = string | { label: string, icon: React.ReactNode }
type ButtonVariants = ButtonProps["variant"]
type IconType = React.ComponentProps<typeof EyeClosedIcon>
type BtnType = React.ComponentProps<typeof Button>

type SideBarLink = {
    label: string;
    route: Routes;
    action?: string;
    nested?: Array<SideBarLink>;
}
interface SidebarProps {
    user?: Omit<User, "password">;
    className?: string;
}

interface InputProps {
    label?: string | React.HTMLAttributes<HTMLLabelElement>[""];
    input: React.InputHTMLAttributes<HTMLInputElement>;
    description?: string;
    btn?: Partial<{
        icon?: React.JSX.Element;
        label?: string;
        type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
        onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
        className?: string;
    }>;
    icon?: Partial<{ handler: Dispatch, children }>;
    containerClass?: string;
    errors?: unknown;
};

type InputFieldType = Partial<React.InputHTMLAttributes<HTMLInputElement>> | Record<string, unknown>
interface InputFieldProps {
    label?: string | { main: string, prefix?: string, suffix?: string };
    description?: string;
    icon?: { stateHandler: () => void, children: React.ReactNode };
    input: InputFieldType;
    errors?: { field: string, bag: Record<string, unknown> }

}
interface CheckboxFieldProps {
    label: string,
    input: Partial<React.ComponentProps<Checkbox>>
}

interface IconProps extends Omit<React.HtmlHTMLAttributes<typeof EyeClosedIcon>, "children"> { };

interface DTRowAction {
    id: string;
    relativeRoute: string;
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    config?: {
        dialog: Partial<{
            title: string;
            description: string;
            form: React.ReactNode;
            confirm: React.ReactNode;
        }>
        & {
            state: {
                open: boolean,
                changer: Dispatch
            }
        }
        ;
        buttons?: Record<DTButtons, DTButtonType>;
    }
}

interface DTColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}
type DTColHeaderAction = { label: string, action?: () => void }
interface DTFilterArgs {
    defaultValue: string;
}
interface DTColHeaderDropDownProps {
    trigger: string;
}
interface DialogFormProps {
    trigger: TriggerButton;
    title?: string;
    description?: string;
    form: PartialFormType;
    state: {
        open: boolean,
        changer: Dispatch
    }
}

type SelectInputOptionsType = { [x: string]: string }
interface SelectInputProps {
    name: string;
    options: Array<SelectInputOptionsType>;
    state: {
        value: string,
        changer: Dispatch
    }
    config?: Partial<{
        label?: string;
        current?: string;
        containerClass: string
    }>
}

interface AlertDialogProps extends React.PropsWithChildren {
    variant?: ButtonVariants;
    trigger: TriggerButton,
    header?: Partial<{
        title: string;
        description: string
    }>
}

interface PopoverProps extends React.PropsWithChildren {
    variant?: ButtonVariants;
    trigger: TriggerButton
    state?: {
        value: boolean,
        handler: (boolean) => void
    }
}