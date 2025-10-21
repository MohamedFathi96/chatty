import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuth } from "../contexts/AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
  context: () => ({
    auth: undefined as ReturnType<typeof useAuth> | undefined,
  }),
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
