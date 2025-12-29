import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import React from "react";

export const NAVBAR_HEIGHT_VAR_NAME = "--navbar-height";

const ScreenWidthBreakpoints = {
  iconsFit: 370,
};

const NavbarContainer = styled.div`
  background-color: var(${SemanticColors.foreground});
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto 1fr;
  max-width: 100%;
  position: sticky;
  top: 0;
  padding: 2vh 1vw;
  border-bottom: 1px solid var(${SemanticColors.primary});
  background-color: var(${SemanticColors.midground});
  z-index: 2;
`;

const NavbarUL = styled(motion.ul)`
  grid-column: 3;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
  gap: 50px;
`;

const NavbarLI = styled.li`
  line-height: 40px;
`;

const NavbarLink = styled(motion.a)`
  font-size: 20px;
  font-weight: bold;
  &:visited,
  &:link {
    text-decoration: none;
    color: var(${SemanticColors.text});
  }
`;

const WhimsyLink = styled(NavbarLink)`
  grid-column: 1;
  font-size: 40px;
  margin-right: auto;

  @media screen and (max-width: ${ScreenWidthBreakpoints.iconsFit}px) {
    font-size: 30px;
    margin: auto;
  }
`;

const NavbarElement: React.FC<{ label: string; href: string }> = ({
  label,
  href,
}) => {
  return (
    <NavbarLI>
      <NavbarLink
        href={href}
        whileHover={{
          color: `var(${SemanticColors.secondary})`,
        }}
      >
        {label}
      </NavbarLink>
    </NavbarLI>
  );
};

const PATHS = ["Blog", "Orrery"] as const;

type SitePath = (typeof PATHS)[number];
type Page = {
  pathNameRegex: RegExp;
  display: string;
  route: string;
};

const Paths: Record<SitePath, Page> = {
  Blog: {
    pathNameRegex: /\/blog($|\/)/gm,
    display: "Blog",
    route: "/blog",
  },
  Orrery: {
    pathNameRegex: /\/orrery($|\/)/gm,
    display: "Orrery",
    route: "/orrery",
  },
};

export const Navbar: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const pathName = window.location.pathname;
  let page: SitePath | null = null;

  for (const pathKey in Paths) {
    const path = Paths[pathKey as SitePath];
    if (pathName.match(path.pathNameRegex)) {
      page = pathKey as SitePath;
      break;
    }
  }

  const setNavbarHeightVariable = () => {
    if (ref != null && ref.current != null) {
      document.documentElement.style.setProperty(
        NAVBAR_HEIGHT_VAR_NAME,
        `${ref.current.clientHeight}px`
      );
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", setNavbarHeightVariable);

    return () => {
      window.removeEventListener("resize", setNavbarHeightVariable);
    };
  }, []);

  React.useEffect(() => {
    setNavbarHeightVariable();
  }, [ref, ref.current]);

  return (
    <NavbarContainer ref={ref}>
      <WhimsyLink
        whileHover={{
          color: `var(${SemanticColors.secondary})`,
        }}
        href="/"
      >
        Whimsy
      </WhimsyLink>
      <div
        style={{
          gridColumn: 2,
        }}
      >
        {page !== null ? (
          <motion.ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "center",
              padding: 0,
            }}
            layout
          >
            <NavbarElement
              label={Paths[page].display}
              href={Paths[page].route}
            />
          </motion.ul>
        ) : null}
      </div>
      <NavbarUL layout>
        {page !== "Blog" && (
          <NavbarElement
            label="Blog"
            href={Paths.Blog.route}
          />
        )}
        {page !== "Orrery" && (
          <NavbarElement
            label="Orrery"
            href={Paths.Orrery.route}
          />
        )}
        <NavbarElement
          label="About"
          href="/#Bio"
        />
      </NavbarUL>
    </NavbarContainer>
  );
};
