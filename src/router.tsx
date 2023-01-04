import { doc, getDoc } from "firebase/firestore";
import { Home, SignInManager } from "./pages";
import { db } from "./firebase";
import { BlogReader } from "./pages/blog/BlogReader";
import { BlogPost } from "./pages/blog/BlogPost";

export const routs = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "admin",
    element: <SignInManager />,
  },
  {
    path: "blog",
    children: [
      {
        path: "/",
        element: <BlogReader />,
      },
      {
        path: ":blogSlug",
        element: <BlogReader />,
      },
    ],
  },
];
