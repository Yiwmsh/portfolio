import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme, TransparentTheme } from "./consts/theme";
import { SignInManager } from "./pages/admin/SignIn";
import { BlogHome } from "./pages/blog/BlogHome/BlogHome";
import { BlogOutlet } from "./pages/blog/BlogOutlet";
import { BlogPostHandler } from "./pages/blog/BlogPost/BlogPostHandler";
import { Home } from "./pages/home/home";
import { ScryfallQuerier } from "./pages/scryfall querier/ScryfallQuerier";
import { Site } from "./pages/site";

export const routes = [
  {
    // path: "/scryfallQuerier",
    path: "/",
    element: (
      <ThemeContext theme={TransparentTheme}>
        <ScryfallQuerier />
      </ThemeContext>
    ),
  },
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
      // {
      //   path: "posts",
      //   element: <>Nothing here yet.</>,
      // },
      {
        path: "post/:blogSlug",
        element: <BlogPostHandler />,
      },
    ],
  },
  {
    // path: "/scryfallQuerier",
    path: "/",
    element: (
      <ThemeContext theme={TransparentTheme}>
        <ScryfallQuerier />
      </ThemeContext>
    ),
  },
];
