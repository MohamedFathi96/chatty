import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../features/auth/pages/login";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect to home if already authenticated
    if (context.auth?.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: LoginPage,
});
