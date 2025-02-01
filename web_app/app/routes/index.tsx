import { redirect } from "react-router";

export function loader() {
    throw redirect("/app")
}

export default function Index() {
    return <div></div>
}