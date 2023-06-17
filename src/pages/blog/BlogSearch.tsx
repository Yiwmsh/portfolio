import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import searchIcon from "../../resources/search-icon-png-9969.png";

export interface BlogSearchProps {
  onSearch: (value: string) => void;
}

const unfocussedSearchDimensions = "200px";

const BlogSearchContainer = styled(motion.div)`
  margin: auto;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid black;
  overflow: hidden;
`;

const BlogSearchInput = styled(motion.input)`
  outline: none;
  border-style: none;
  line-height: 30px;
`;

const BlogSearchButton = styled(motion.button)`
  background-color: transparent;
  border: 0;
  border-style: none;
  outline: none;
  cursor: pointer;
`;

const BlogSearchButtonImage = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

const containerAnimations = {
  initial: {},
  hover: {},
  focus: {
    border: `1px solid var${SemanticColors.secondary}`,
  },
};

const buttonAnimations = {
  initial: {},
  hover: {},
  focus: {},
};

const inputAnimations = {
  initial: {},
  hover: {},
  focus: {},
};

export const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  const [value, setValue] = React.useState("");
  return (
    <BlogSearchContainer
      layout
      initial="initial"
      whileHover="hover"
      whileFocus="focus"
      variants={containerAnimations}
    >
      <BlogSearchButton onClick={() => onSearch(value)}>
        <BlogSearchButtonImage
          src={searchIcon}
          alt="Search"
        />
      </BlogSearchButton>
      <BlogSearchInput
        variants={inputAnimations}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </BlogSearchContainer>
  );
};
