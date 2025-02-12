import { Heading, Text } from "@radix-ui/themes";

type ReactProps = React.PropsWithChildren
interface ComponentProps<T> extends ReactProps {
    props?: T
}

interface HeaderProps extends ComponentProps<React.ComponentPropsWithoutRef<typeof Heading>> { }
function Header({ props = {
    size: "8",
    as: "h1"
}, children }: HeaderProps) {
    return <Heading {...props}>{children}</Heading>
}

interface CardDescriptionProps extends ComponentProps<React.ComponentPropsWithoutRef<typeof Text>> { }
function CardDescription({ props = {
    size: "2",
    weight: "light",
    trim: "end",
    as: "p",
}, children }: CardDescriptionProps) {
    return <Text {...props}>{children}</Text>
}

export { Header, CardDescription }