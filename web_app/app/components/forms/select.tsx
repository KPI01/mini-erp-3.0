import { Grid, Select } from "@radix-ui/themes";
import { Label } from "radix-ui";
import type { SelectInputProps } from "~/types/components";

export default function SelectInput({ name, options, state, config }: SelectInputProps) {
    console.debug("selected:", state.value)

    const trigger = state.value && state.value !== "" ? options[Number(state.value) - 1][state.value] : "Seleccionar..."

    return (
        <Grid columns="1" gapY="1" align="center" className={config?.containerClass}>
            {config?.label && <Label.Root>{config.label}</Label.Root>}
            <Select.Root name={name} size="3" defaultValue={state.value} onValueChange={state.changer} >
                <Select.Trigger variant="surface">
                    {trigger}
                </Select.Trigger>
                <Select.Content>
                    {options.map((opt, i) => {
                        const value = Object.keys(opt)[0]
                        const display = Object.values(opt)[0]
                        return <Select.Item key={i} value={value}>
                            {display}
                        </Select.Item>
                    })}
                </Select.Content>
            </Select.Root>
        </Grid>
    )
}