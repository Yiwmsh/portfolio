import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../../resources/search-icon-png-9969.png";

const unfocussedSearchDimensions = "200px";

const BlogSearchContainer = styled(motion.form)`
  margin: auto;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid black;
  overflow: hidden;
  align-items: center;
  justify-content: center;
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
  padding: 5px;
  margin: 0;
`;

const BlogSearchButtonImage = styled.img`
  max-height: 20px;
  max-width: 20px;
  color: inherit;
`;

export const BlogSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [containerHovered, setContainerHovered] = React.useState(false);
  const [containerFocussed, setContainerFocussed] = React.useState(false);

  const expandContainer = containerFocussed || containerHovered || value !== "";

  return (
    <BlogSearchContainer
      onSubmit={(e) => {
        e.preventDefault();
        navigate(value === "" ? `/blog/posts` : `/blog/posts?title=${value}`);
      }}
      layout
      onHoverStart={() => {
        setContainerHovered(true);
      }}
      onHoverEnd={() => setContainerHovered(false)}
      onFocus={() => setContainerFocussed(true)}
      onBlur={() => setContainerFocussed(false)}
      animate={{
        background: expandContainer
          ? `var(${SemanticColors.background})`
          : "transparent",
        border: !expandContainer
          ? "none"
          : `1px solid var(${
              containerFocussed
                ? SemanticColors.secondaryActive
                : SemanticColors.text
            })`,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <BlogSearchButton
        transition={{
          duration: 0.5,
        }}
        whileHover={{
          color: `var(${SemanticColors.secondary})`,
        }}
        whileFocus={{
          color: `var(${SemanticColors.secondaryActive})`,
        }}
        type="submit"
      >
        <BlogSearchButtonImage
          src={searchIcon}
          alt="Search"
        />
      </BlogSearchButton>
      <BlogSearchInput
        placeholder="Search for a post"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        animate={{
          width: expandContainer ? "150px" : "0px",
          padding: expandContainer ? "0 2px" : "0px",
        }}
        transition={{
          duration: 0.5,
        }}
      />
    </BlogSearchContainer>
  );
};
