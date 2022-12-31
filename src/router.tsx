import { Home, SignInManager } from "./pages";

export const routs = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <SignInManager />,
  },
];
