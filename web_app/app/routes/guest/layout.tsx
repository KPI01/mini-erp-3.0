import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="grid place-content-center w-full h-full">
      <Outlet />
    </main>
  );
}
