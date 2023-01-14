import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { SemanticColors } from "@chrisellis/react-carpentry";
import { BlogSearch } from "./BlogSearch";

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
        <NavbarElement label="Blog" href="/blog" />
        <NavbarElement label="Posts" href="/posts" />
        <NavbarElement label="About" href="/about" />
        <NavbarLI>
          <BlogSearch onSearch={(value) => {}} />
        </NavbarLI>
      </NavbarUL>
    </NavbarContainer>
  );
};
