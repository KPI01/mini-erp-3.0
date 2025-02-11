<<<<<<< Updated upstream
=======
import type { User } from "@prisma/client";
import type { EyeClosedIcon, } from "@radix-ui/react-icons";
import type { Button, IconButton } from "@radix-ui/themes";
import type { ColumnDef } from "@tanstack/react-table";
import type { AlertDialog } from "radix-ui";

type IconType = React.ComponentProps<typeof EyeClosedIcon>
type BtnType = React.ComponentProps<typeof Button>

type SideBarLink = {
    label: string;
    action?: string;
    nested?: Array<SideBarLink>
}
interface SidebarProps {
    className?: string
    user?: Omit<User, "password">
}

>>>>>>> Stashed changes
interface InputProps {
    label?: string;
    input: React.InputHTMLAttributes<HTMLInputElement>;
    btn?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    icon?: React.ReactNode;
    containerClass?: string;
    errors?: string[];
<<<<<<< Updated upstream
=======
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

interface AlertProps {
    trigger: string | { label: string, icon: React.ReactNode };
    title: string;
    description: string;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}