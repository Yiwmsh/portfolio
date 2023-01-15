import { Home, SignInManager } from "./pages";
import { Blog } from "./pages/blog/Blog";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts";
import { Site } from "./pages/site";
import { BlogPosts } from "./pages/blog/BlogPosts/BlogPosts";

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
      // {
      //   path: "posts",
      //   element: <BlogPosts />,
      // },
      {
        path: "post/:blogSlug",
        element: <Blog />,
      },
      // {
      //   path: "preview/:blogSlug"
      // }
    ],
  },
];
