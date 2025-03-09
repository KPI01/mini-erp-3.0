import { PrismaClient, type Prisma, type Proveedor } from "@prisma/client";
import { Button, Flex, Grid, Skeleton } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { Form, useFetcher } from "react-router";
import { InputField } from "~/components/forms/input";
import { TextAreaField } from "~/components/forms/textArea";
import { updateProveedorSchema, type UpdateProveedor } from "~/lib/zod-schemas/compras/proveedor";

interface UpdateProveedorFormProps {
    id: string
    submitFn(): void
}
export default function UpdateProveedorForm({ id, submitFn }: UpdateProveedorFormProps) {
    const { load, data, state, submit } = useFetcher<{ data: UpdateProveedor }>()
    const [formValues, setFormValues] = useState<UpdateProveedor>({
        razonSocial: "",
        idFiscal: "",
        correo: "",
        direccion: "",
        telefono: "",
        url: "",
        observaciones: ""
    });

    useEffect(() => {
        if (!data) {
            const fetchProveedor = async () => {
                try {
                    load(`/app/compras/proveedor?id=${id}`);
                } catch (error) {
                    console.error("error al cargar el proveedor:", error);
                }
            };

            fetchProveedor();
        }
    }, [id]);

    useEffect(() => {
        if (data) {
            console.log("estableciendo valores del formulario:", data?.data);
            setFormValues(prev => ({
                ...prev,
                ...data?.data
            }));
        }
    }, [data]);

    console.log("fetcher data:", data?.data)

    const form = useForm({
        defaultValues: formValues,
        validators: { onChange: updateProveedorSchema, onBlur: updateProveedorSchema },
        onSubmit: ({ value }) => {
            const formData = new FormData()
            const keys = Object.keys(value)
            const values = Object.values(value)
            keys.forEach((key, ix) => {
                formData.append(key, String(values[ix]))
            })

            console.info("subiendo formulario UpdateProveedor")
            submit(formData, {
                action: `/app/compras/proveedor/${id}`,
                method: "put"
            })
            submitFn()
        }
    });

    return <Grid gapY="4" gapX="2" columns="2">
        <Skeleton loading={state === "loading"}>
            <form.Field
                name="razonSocial"
                children={(field) => (
                    <InputField
                        label="Razón Social *"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur,
                        }}
                    />
                )}
            />
            <form.Field
                name="idFiscal"
                children={(field) => (
                    <InputField
                        label="ID Fiscal *"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur,
                            disabled: true,
                        }}
                    />
                )}
            />
            <form.Field
                name="correo"
                children={(field) => (
                    <InputField
                        label="Correo *"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur,
                        }}
                    />
                )}
            />
            <form.Field
                name="direccion"
                children={(field) => (
                    <InputField
                        label="Dirección *"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur,
                        }}
                    />
                )}
            />
            <form.Field
                name="telefono"
                children={(field) => (
                    <InputField
                        label="Nro. de Teléfono"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur
                        }}
                    />
                )}
            />
            <form.Field
                name="url"
                children={(field) => (
                    <InputField
                        label="Sitio Web"
                        input={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur
                        }} />
                )} />
            <form.Field
                name="observaciones"
                children={(field) => (
                    <TextAreaField
                        label="Observaciones"
                        textarea={{
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => field.handleChange(e.target.value),
                            onBlur: field.handleBlur
                        }}
                        config={{
                            container: { gridColumn: "1 / -1" }
                        }}
                    />
                )}
            />
            <Flex gridColumn="1 / -1" justify="end">
                <Button type="button" size="3" onClick={() => form.handleSubmit()}>Guardar</Button>
            </Flex>
        </Skeleton>
    </Grid>
}