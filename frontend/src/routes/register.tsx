import { createFileRoute, redirect } from "@tanstack/react-router";
import RegisterPage from "../features/auth/pages/register";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    // Redirect to home if already authenticated
    if (context.auth?.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RegisterPage,
});
