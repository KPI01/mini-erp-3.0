import type { User } from "@prisma/client";
import type { EyeClosedIcon } from "@radix-ui/react-icons";
import type {
  Button,
  IconButton,
  Checkbox,
  ButtonProps,
  AlertDialog,
  CardProps,
  GridProps,
  Popover,
  HeadingProps,
} from "@radix-ui/themes";
import type {
  Column,
  ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  Header,
  OnChangeFn,
} from "@tanstack/react-table";
import type { Routes } from "./session";
import { Form, Select } from "radix-ui";
import type { CSSProperties, Dispatch } from "react";
import type { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";
import type { TriggerProps } from "@radix-ui/themes/components/popover";

type SideType = Popover.ContentProps["side"];
type TriggerButton = React.ReactNode;
type VariantsType = ButtonProps["variant"];
type ColorsType = ButtonProps["color"];
type MaxWidthType = Responsive<string>;
type IconType = React.ComponentProps<typeof EyeClosedIcon>;
type BtnType = React.ComponentProps<typeof Button>;

type SideBarLink = {
  label: string;
  route: Routes;
  action?: string;
  nested?: Array<SideBarLink>;
};
interface SidebarProps {
  user?: Omit<User, "password">;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  props?: Omit<HeadingProps, "size" | "as">;
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
  icon?: Partial<{ handler: Dispatch; children }>;
  containerClass?: string;
  errors?: unknown;
}

type InputFieldType = React.InputHTMLAttributes<HTMLInputElement>;
interface InputFieldProps {
  label?: string | { main: string; prefix?: string; suffix?: string };
  description?: string;
  icon?: { stateHandler: () => void; children: React.ReactNode };
  input: InputFieldType;
  errors?: ErrorsFieldType;
}
interface CheckboxFieldProps {
  containerProps?: GridProps;
  label: string;
  input: Partial<React.ComponentProps<typeof Checkbox>>;
  errors?: ErrorsFieldType;
}

interface IconProps
  extends Omit<React.HtmlHTMLAttributes<typeof EyeClosedIcon>, "children"> {}

interface DTRowAction {
  id: string;
  route: string;
  values: any;
  aux?: any;
  errorBag: Record<string, unknown>;
  editForm: { type?: "popover" | "alertDialog"; children: React.ReactNode };
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  bodyFallback?: React.ReactNode;
  state?: Partial<{
    pageSize: number;
    pagination: PaginationState;
    changePageSize: boolean;
    showPagination: boolean;
    filter: ColumnFiltersState;
    onFilterChange: OnChangeFn<ColumnFiltersState>;
  }>;
}

interface DTColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>;
  title: string;
}
type DTColHeaderAction = { label: string; action?: () => void };
interface DTFilterArgs {
  column: Column<any, unknown>;
}
interface DTColHeaderDropDownProps {
  trigger: string;
  header: Header<any, unknown>;
}
interface DialogFormProps {
  trigger: TriggerButton;
  title?: string;
  description?: string;
  form: PartialFormType;
  state: {
    open: boolean;
    changer: Dispatch;
  };
}

type SelectInputOptionsType = { [x: string]: string };
interface SelectInputProps {
  name: string;
  options: SelectInputOptionsType;
  placeholder?: string;
  state: {
    value: string | undefined;
    changer(value: string | undefined): void;
  };
  config?: Partial<{
    label: string;
    current: string;
    rootSize: Responsive<"1" | "2" | "3">;
    containerStyle: CSSProperties;
  }>;
  errors?: ErrorsFieldType;
}

interface AlertDialogProps extends React.PropsWithChildren {
  variant?: VariantsType;
  trigger: TriggerButton;
  header?: Partial<{
    title: string;
    description: string;
  }>;
}

interface PopoverProps extends React.PropsWithChildren {
  variant?: VariantsType;
  color?: ColorsType;
  maxWidth?: MaxWidthType;
  trigger: TriggerButton;
  side?: SideType;
  state?: {
    value: boolean;
    handler: (boolean) => void;
  };
}

interface CardContructorProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  variant?: CardProps["variant"];
  size?: CardProps["size"];
  contentProps?: Partial<{
    align: GridProps["align"];
    justify: GridProps["justify"];
    px: GridProps["px"];
    py: GridProps["py"];
  }>;
}

interface DatePickerProps {
  name: string;
  label: string;
}
