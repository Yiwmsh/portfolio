import { doc, getDoc } from "firebase/firestore";
import { Home, SignInManager } from "./pages";
import { db } from "./firebase";
import { Blog } from "./pages/blog/Blog";
import { BlogPost } from "./pages/blog/BlogPost/BlogPost";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { DarkTheme, LightTheme, TransparentTheme } from "./consts";
import { Site } from "./pages/site";
import { About } from "./pages/about";

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
        element: <Blog />,
      },
      {
        path: ":blogSlug",
        element: <Blog />,
      },
    ],
  },
  {
    path: "about",
    element: <About />,
  },
];
