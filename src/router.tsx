import { doc, getDoc } from "firebase/firestore";
import { Home, SignInManager } from "./pages";
import { db } from "./firebase";
import { BlogReader } from "./pages/blog/BlogReader";
import { BlogPost } from "./pages/blog/BlogPost";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { DarkTheme, LightTheme, TransparentTheme } from "./consts";
import { Site } from "./pages/site";

export const routs = [
  {
    path: "/",
    element: (
      <ThemeContext theme={TransparentTheme}>
        <Site>
          <Home />
        </Site>
      </ThemeContext>
    ),
  },
  {
    path: "admin",
    element: (
      <ThemeContext theme={LightTheme}>
        <SignInManager />
      </ThemeContext>
    ),
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
