import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthorizedLayout } from "@/components/layout/AuthorizedLayout";

export const Route = createFileRoute("/_autherized")({
  beforeLoad: ({ context }) => {
    console.log("context.auth?.accessToken", context.auth);
    if (!context.auth?.accessToken) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthorizedLayout,
});
