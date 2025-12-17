import { ThemeContext } from "@chrisellis/react-carpentry";
import { TransparentTheme } from "../consts/theme";
import { SignInManager } from "../pages/admin/SignIn";
import { BlogHome } from "../pages/blog/BlogHome/BlogHome";
import { BlogPostHandler } from "../pages/blog/BlogPost/BlogPostHandler";
import { Home } from "../pages/home/home";
import { ScryfallQuerier } from "../pages/scryfall querier/ScryfallQuerier";
import { Showcase } from "../pages/Showcase";
import { SiteOutlet } from "../pages/SiteOutlet";

export const routes = [
  {
    path: "/",
    index: true,
    element: (
      <ThemeContext theme={TransparentTheme}>
        <Showcase>
          <Home />
        </Showcase>
      </ThemeContext>
    ),
  },
  {
    path: "/",
    element: <SiteOutlet />,
    children: [
      {
        path: "/blog",
        children: [
          {
            index: true,
            element: <BlogHome />,
          },
          {
            path: "/blog/post/:blogSlug",
            element: <BlogPostHandler />,
          },
          // {
          //   path: "posts",
          //   element: <>Nothing here yet.</>,
          // },
        ],
      },
      {
        path: "admin",
        element: <SignInManager />,
      },
      {
        path: "orrery",
        element: <ScryfallQuerier />,
      },
    ],
  },
];
