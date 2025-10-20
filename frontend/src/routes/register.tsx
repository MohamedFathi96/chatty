import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "../components/RegisterForm";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    // Redirect to home if already authenticated
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterForm />;
}
