import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts";
import { Home, SignInManager } from "./pages";
import { BlogHome } from "./pages/blog";
import { BlogPostHandler } from "./pages/blog/BlogPost/BlogPostHandler";
import { BlogPosts } from "./pages/blog/BlogPosts/BlogPosts";
import { BlogRoot } from "./pages/blog/BlogRoot";
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
    element: <BlogRoot />,
    children: [
      {
        index: true,
        element: <BlogHome />,
      },
      {
        path: "posts",
        element: <BlogPosts />,
      },
      {
        path: "post/:blogSlug",
        element: <BlogPostHandler />,
      },
    ],
  },
];
