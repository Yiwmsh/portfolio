import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts/theme";
import { SignInManager } from "./pages/admin/SignIn";
import { BlogHome } from "./pages/blog/BlogHome/BlogHome";
import { BlogOutlet } from "./pages/blog/BlogOutlet";
import { BlogPostHandler } from "./pages/blog/BlogPost/BlogPostHandler";
import { BlogSearchPage } from "./pages/blog/BlogSearch/BlogSearchPage";
import { GuitarHomePage } from "./pages/guitar/GuitarHomePage";
import { GuitarPageOutlet } from "./pages/guitar/GuitarPageOutlet";
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
    element: <BlogOutlet />,
    children: [
      {
        index: true,
        element: <BlogHome />,
      },
      {
        path: "posts",
        element: <BlogSearchPage />,
      },
      {
        path: "post/:blogSlug",
        element: <BlogPostHandler />,
      },
    ],
  },
  {
    path: "guitar",
    element: <GuitarPageOutlet />,
    children: [
      {
        index: true,
        element: <GuitarHomePage />,
      },
    ],
  },
];
