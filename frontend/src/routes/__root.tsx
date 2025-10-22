import type { useAuth } from "@/contexts/AuthContext";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  context: ({ context }: { context: { auth: ReturnType<typeof useAuth> } }) => ({
    auth: context.auth,
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
