import { cleanErrors } from "~/helpers/utils";
import type {
    TextAreaFieldProps,
    TextAreaSlots
} from "~/types/components";
import {
    Grid,
    Text,
    TextArea,
} from "@radix-ui/themes";
import { Label } from "radix-ui";
import { displayErrors } from "./input";

export function TextAreaField({
    label,
    textarea,
    errors,
    description,
    slots,
    config
}: TextAreaFieldProps) {
    const errorBag = cleanErrors(textarea.name, errors);
    const textareaId = String(textarea.id || textarea.name);

    const Description = description ? (
        <Text as="p" size="1" weight="light" trim="both">
            {description}
        </Text>
    ) : null;

    return (
        <Grid gapY="1" {...config?.container}>
            {slots?.labelPosition === 'outside' && typeof label === 'string' && (
                <Label.Root htmlFor={textareaId}>{label}</Label.Root>
            )}

            {slots?.labelPosition !== 'outside' && typeof label === 'string' && (
                <Label.Root htmlFor={textareaId}>{label}</Label.Root>
            )}

            <TextArea
                {...textarea}
                id={textareaId}
                size={slots?.size || "2"}
                variant={slots?.variant || "surface"}
            />

            {Description}

            {displayErrors(errorBag)}
        </Grid>
    );
}