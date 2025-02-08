import { Box, Card } from "@radix-ui/themes";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <Box style={{ display: "grid", placeContent: "center" }} className="h-full">
      <Card size="3" className="max-w-md">
        <Outlet />
      </Card>
    </Box>
  );
}
