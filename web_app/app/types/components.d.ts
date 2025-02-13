import type { User } from "@prisma/client";
import type { EyeClosedIcon, } from "@radix-ui/react-icons";
import type { Button, IconButton } from "@radix-ui/themes";
import type { Column, ColumnDef } from "@tanstack/react-table";
import type { Routes } from "./session";

type IconType = React.ComponentProps<typeof EyeClosedIcon>
type BtnType = React.ComponentProps<typeof Button>

type SideBarLink = {
    label: string;
    route: Routes
    action?: string;
    nested?: Array<SideBarLink>
}
interface SidebarProps {
    user?: Omit<User, "password">,
    className?: string
}

interface InputProps {
    label?: string | React.HTMLAttributes<HTMLLabelElement>[""];
    input: React.InputHTMLAttributes<HTMLInputElement>;
    description?: string;
    btn?: Partial<{
        icon?: React.JSX.Element,
        label?: string,
        type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
        onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
        className?: string
    }>;
    icon?: React.ReactNode;
    containerClass?: string;
    errors?: unknown;
}

interface IconProps extends Omit<React.HtmlHTMLAttributes<typeof EyeClosedIcon>, "children"> { }

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[]
}

interface DTColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}
type DTColHeaderAction = { label: string, action?: () => void }
interface DTFilterArgs {
    defaultValue: string
}
interface DTColHeaderDropDownProps {
    trigger: string
}

interface DialogFormProps {
    trigger: string | { label: string, icon: React.ReactNode }
    title?: string
    description?: string
    actions?: { cancel: string, confirm: string }
    form: React.ReactNode
}