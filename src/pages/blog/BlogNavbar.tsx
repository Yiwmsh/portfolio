import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import React from "react";

const ScreenWidthBreakpoints = {
  iconsFit: 370,
};

const NavbarContainer = styled.div`
  background-color: var(${SemanticColors.foreground});
  display: flex;
  max-width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-direction: row;
  position: sticky;
  top: 0;
  padding: 2vh 0;
  border-bottom: 1px solid var(${SemanticColors.primary});
  background-color: var(${SemanticColors.midground});
  z-index: 2;
`;

const NavbarUL = styled(motion.ul)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  list-style: none;
  gap: 50px;
  margin-right: 5vw;
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
  font-size: 40px;
  margin-left: 5vw;

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

export const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <WhimsyLink
        whileHover={{
          color: `var(${SemanticColors.secondary})`,
        }}
        href="/"
      >
        Whimsy
      </WhimsyLink>
      <NavbarUL layout>
        <NavbarElement
          label="Blog"
          href="/blog"
        />
        {/* <NavbarElement label="Posts" href="/blog/posts" /> */}
        <NavbarElement
          label="About"
          href="/#Bio"
        />
        <NavbarLI></NavbarLI>
      </NavbarUL>
    </NavbarContainer>
  );
};
