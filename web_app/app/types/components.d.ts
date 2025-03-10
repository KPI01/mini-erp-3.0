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
  Dialog,
  TextField,
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
import type { TextArea } from "@radix-ui/themes";
import type { Responsive } from "@radix-ui/themes/dist/esm/props/prop-def.js";

type SideType = Popover.ContentProps["side"];
type TriggerButton = React.ReactNode;
type VariantsType = ButtonProps["variant"];
type ColorsType = ButtonProps["color"];
type MaxWidthType = Responsive<string>;
type IconType = React.ComponentProps<typeof EyeClosedIcon>;
type BtnType = React.ComponentProps<typeof Button>;
type DialogContentProps = React.ComponentProps<typeof Dialog.ContentProps>;

type SideBarLink = {
  label: string;
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

type InputFieldType = React.InputHTMLAttributes<HTMLInputElement> & TextField.RootProps;
interface InputFieldProps {
  label?: string | { main: string; prefix?: string; suffix?: string };
  description?: string;
  icon?: { stateHandler: () => void; children: React.ReactNode };
  input: InputFieldType;
  errors?: ErrorsFieldType;
}
type DebouncedInputBase = React.InputHTMLAttributes<HTMLInputElement> | React.ComponentProps<typeof TextField.RootProps>
interface DebouncedInputProps extends DebouncedInputBase {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  slots: React.ReactNode
}
interface CheckboxFieldProps {
  containerProps?: GridProps;
  label: string;
  input: Partial<React.ComponentProps<typeof Checkbox>>;
  errors?: ErrorsFieldType;
}

export interface TextAreaSlots {
  labelPosition?: 'inside' | 'outside';
  size?: React.ComponentProps<typeof TextArea>["size"];
  variant?: React.ComponentProps<typeof TextArea>["variant"];
  resize?: React.ComponentProps<typeof TextArea>["resize"];
}

export interface TextAreaFieldProps {
  label?: string;
  textarea: React.ComponentProps<typeof TextArea>;
  errors?: Record<string, unknown & { _errors: string[] }>;
  description?: string;
  slots?: TextAreaSlots;
  config?: Partial<{ container: GridProps }>
}

interface IconProps
  extends Omit<React.HtmlHTMLAttributes<typeof EyeClosedIcon>, "children"> { }

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
  config?: Partial<{
    debug: boolean
  }>
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
interface RowMenuProps {
  items: Array<React.ReactNode>
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

interface DialogProps extends React.PropsWithChildren {
  trigger: TriggerButton;
  header?: Partial<{ title: string; description: string }>;
  state?: Partial<{
    open: boolean;
    setOpen: (update: boolean) => void
  }>
  config?: {
    trigger: BtnType;
    content: DialogContentProps;
  };
}

interface AlertDialogProps extends React.PropsWithChildren {
  variant?: VariantsType;
  trigger: TriggerButton;
  header?: Partial<{
    title: string;
    description: string;
  }>;
}
interface AlertDialogRootProps extends React.PropsWithChildren {
  trigger?: TriggerButton
  state?: Pick<React.ComponentProps<typeof AlertDialog.RootProps>, "open" | "onOpenChange">
}
interface AlertDialogContentProps extends React.PropsWithChildren {
  header?: Partial<{
    title: string;
    description: string
  }>
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
