import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts/theme";
import { SignInManager } from "./pages/admin/SignIn";
import { BlogHome } from "./pages/blog/BlogHome/BlogHome";
import { BlogPostHandler } from "./pages/blog/BlogPost/BlogPostHandler";
import { BlogPosts } from "./pages/blog/BlogPosts/BlogPosts";
import { BlogRoot } from "./pages/blog/BlogRoot";
import { Home } from "./pages/home/home";
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
