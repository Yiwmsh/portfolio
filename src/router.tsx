import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts";
import { Home, SignInManager } from "./pages";
import { Blog } from "./pages/blog/Blog";
import { BlogPosts } from "./pages/blog/BlogPosts/BlogPosts";
import { Site } from "./pages/site";

export const routes = [
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
    element: <Blog />,
    children: [
      {
        path: "posts",
        element: <BlogPosts />,
      },
      {
        path: "post/:blogSlug",
        element: <Blog />,
      },
    ],
  },
];
