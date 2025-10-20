import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { queryClient } from "../lib/queryClient";

export const Route = createRootRoute({
  component: RootComponent,
  context: () => ({
    auth: undefined as ReturnType<typeof useAuth> | undefined,
  }),
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
}
