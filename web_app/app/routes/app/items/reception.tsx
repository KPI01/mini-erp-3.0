import { Box, Card, Container, Grid, Heading, Separator, Text } from "@radix-ui/themes";

export default function Reception() {
    return <Grid align="center" justify="center" className="!h-full" columns="1">
        <Box>
            <Heading mb="4">Pedidos pendientes de recibir</Heading>
            <Box className="px-4">Aqui van los pedidos pendientes</Box>
        </Box>
        <Separator size="4" />
        <Box>
            <Heading mb="4">Ultimos movimientos</Heading>
            <Box>Aqui se mostraran los ultimos movimientos de material y una accion para agregar</Box>
        </Box>
    </Grid>
}