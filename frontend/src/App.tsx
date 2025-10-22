import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./contexts/AuthContext";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const authContext = useAuth();
  return <RouterProvider router={router} context={{ auth: authContext }} />;
};

export default App;
