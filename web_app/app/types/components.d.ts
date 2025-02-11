import type { User } from "@prisma/client";
import type { EyeClosedIcon, } from "@radix-ui/react-icons";
import type { Button, IconButton } from "@radix-ui/themes";
import type { ColumnDef } from "@tanstack/react-table";

type IconType = React.ComponentProps<typeof EyeClosedIcon>
type BtnType = React.ComponentProps<typeof Button>

type SideBarLink = {
    label: string;
    action?: string;
    nested?: Array<SideBarLink>
}
interface SidebarProps {
    user?: Omit<User, "password">
}

interface InputProps {
    label?: string | React.HTMLAttributes<HTMLLabelElement>[""];
    input: React.InputHTMLAttributes<HTMLInputElement>;
    btn?: Partial<{
        icon?: React.JSX.Element,
        label?: string,
        type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
        onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
        className?: string
    }>;
    icon?: React.ReactNode;
    containerClass?: string;
    errors?: string[];
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[],
    display?: {
        btns?: Array<
            string | {
                label: string,
                icon: React.ReactNode,
                props?: BtnType
            }>
    };
    config?: {
        btns: { el: BtnType }
    }
}

// interface DataTableHeaderProps<TData, TValue>