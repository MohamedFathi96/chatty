import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";

// Create a new router instance
const appRouter = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

const App = () => {
  const authContext = useAuth();

  return (
    <SocketProvider>
      <RouterProvider router={appRouter} context={{ auth: authContext }} />
    </SocketProvider>
  );
};

export default App;
