import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { emailMe } from "../utils/emailMe";
import { Navigate } from "./scryfall querier/utilities/navigate";

export const NAVBAR_HEIGHT_VAR_NAME = "--navbar-height";

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

const HOME_PATHS = ["Home", "About", "Contact"] as const;

const PAGE_PATHS = ["Blog"] as const;

const TOOL_PATHS = ["Orrery"] as const;

const PATH_GROUPS = [HOME_PATHS, PAGE_PATHS, TOOL_PATHS] as const;

const allPaths = PATH_GROUPS.flat();

type SitePath = (typeof PATH_GROUPS)[number][number];
type Page = {
  pathNameRegex?: RegExp;
  display: string;
  onClick: () => void;
};

const Paths: Record<SitePath, Page> = {
  Blog: {
    pathNameRegex: /\/blog($|\/)/gm,
    display: "Blog",
    onClick: () => {
      Navigate("/blog");
    },
  },
  Orrery: {
    pathNameRegex: /\/orrery($|\/)/gm,
    display: "Orrery",
    onClick: () => {
      Navigate("/orrery");
    },
  },
  About: {
    pathNameRegex: /\/#[bB]io($|\/)/gm,
    display: "About",
    onClick: () => {
      Navigate("/#Bio");
    },
  },
  Home: {
    pathNameRegex: /\//,
    display: "Home",
    onClick: () => {
      Navigate("/");
    },
  },
  Contact: {
    display: "Contact",
    onClick: () => {
      emailMe();
    },
  },
};

export const Navbar: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const pathName = window.location.pathname;
  let page: SitePath | null = null;

  for (const pathKey in Paths) {
    const path = Paths[pathKey as SitePath];
    if (path.pathNameRegex && pathName.match(path.pathNameRegex)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ref.current]);

  return (
    <NavbarContainer ref={ref}>
      <div
        style={{
          gridColumn: 2,
        }}
      >
        <NavbarDropdown currentPage={page as SitePath} />
      </div>
    </NavbarContainer>
  );
};

interface NavbarDropdownProps {
  currentPage: SitePath;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ currentPage }) => {
  return (
    <select
      value={currentPage}
      style={{
        appearance: "none",
        border: "none",
        background: "none",
        fontSize: "3rem",
        fontFamily: "inherit",
        textAlign: "center",
        lineHeight: "3rem",
        cursor: "pointer",
      }}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const path = Paths[e.target.value as SitePath];
        path.onClick();
      }}
    >
      {PATH_GROUPS.map((pathGroup, i) => (
        <>
          {i > 0 && <hr />}
          {pathGroup.map((path) => (
            <option
              style={{
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {Paths[path as SitePath].display}
            </option>
          ))}
        </>
      ))}
    </select>
  );
};
