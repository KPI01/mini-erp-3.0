import type { GridProps } from "@radix-ui/themes";
import type { Checkbox, TextField } from "@radix-ui/themes";
import type { FieldMeta, ValidationError } from "@tanstack/react-form";
import type { ComponentProps, ReactNode } from "react";

type fieldMeta = FieldMeta
type fieldErrors = ValidationError | ValidationError[]
type ErrorsFieldType = Record<string, unknown>;

// Updated interfaces with simpler fieldErrors prop
interface InputFieldProps {
    label?: string | {
        main: string;
        prefix?: string | ReactNode;
        suffix?: string | ReactNode
    };
    description?: string;
    icon?: { stateHandler: () => void; children: ReactNode };
    input: ComponentProps<typeof TextField.Root>;
    errors?: ErrorsFieldType;
    fieldMeta?: fieldMeta; // Direct error messages from the field
}

interface CheckboxFieldProps {
    containerProps?: GridProps;
    label: string;
    input: Partial<ComponentProps<typeof Checkbox>>;
    errors?: ErrorsFieldType;
    fieldErrors?: fieldErrors; // Direct error messages from the field
}

interface DebouncedInputProps extends ComponentProps<typeof TextField.Root> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
    slots?: ReactNode;
}
