import { Heading, Separator } from "@radix-ui/themes";

interface HeaderProps extends React.PropsWithChildren {
    props?: React.ComponentProps<typeof Heading>
}
function Header({ children, props = { size: "8", className: "!my-6" } }: HeaderProps) {
    return <Heading {...props}>{children}</Heading>
}

export { Header }