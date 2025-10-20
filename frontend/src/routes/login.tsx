import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "../features/auth/components/LoginForm";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect to home if already authenticated
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
