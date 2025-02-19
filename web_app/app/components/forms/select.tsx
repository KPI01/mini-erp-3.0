import { Grid, Select } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { cleanErrors } from "~/helpers/utils";
import type { SelectInputProps } from "~/types/components";
import { displayErrors } from "./input";
import { useState } from "react";

export default function SelectInput({ name, options, state, config, errors }: SelectInputProps) {
    console.log(`select [${name}]:`, state.value, options)
    const errorBag = cleanErrors(name, errors)
    console.debug("selected:", state.value)

    const trigger = state.value && options[options.findIndex((value) => (Object.keys(value)[0] === state.value))][state.value]

    return (
        <Grid columns="1" gapY="1" align="center" className={config?.containerClass}>
            {config?.label && <Label.Root>{config.label}</Label.Root>}
            <Select.Root name={name} size="3" value={state.value} onValueChange={state.changer} disabled={options.length < 1}>
                <Select.Trigger variant="surface" placeholder={options.length < 1 ? "Nada que mostrar..." : ""} />
                <Select.Content position="popper">
                    {options.map((opt, i) => {
                        const value = Object.keys(opt)[0]
                        const display = Object.values(opt)[0]
                        return <Select.Item key={i} value={value} >
                            {display}
                        </Select.Item>
                    })}
                </Select.Content>
            </Select.Root>
            {errorBag && displayErrors(errorBag)}
        </Grid>
    )
}