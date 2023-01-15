import React from "react";
import styled from "@emotion/styled";
import { BlogPostProps } from "./blogPostProps";
import { Modal } from "../../../components";
import {
  Button,
  ThemeContext,
  SemanticColors,
} from "@chrisellis/react-carpentry";
import { LightTheme } from "../../../consts";
import { BlogPost, Navbar } from "../../blog";

const CloseButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 10px;
  right: 10px;
  height: 40px;
  width: 40px;
  font-size: 30px;
  background: red;
  border: none;
  border-radius: 20px;
  z-index: 1;
`;

const PreviewContainer = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  background: var(${SemanticColors.background});
  overflow: scroll;
`;

export const BlogPostPreviewButton: React.FC<{
  onPress: () => BlogPostProps;
}> = ({ onPress }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [post, setPost] = React.useState<BlogPostProps>();
  return (
    <>
      <Button
        onPress={() => {
          setPost(onPress());
          setIsOpen(true);
        }}
      >
        Preview
      </Button>
      <Modal isOpen={isOpen}>
        <ThemeContext theme={LightTheme}>
          <PreviewContainer>
            <CloseButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              x
            </CloseButton>
            <Navbar />
            {post ? <BlogPost post={post} /> : ""}
          </PreviewContainer>
        </ThemeContext>
      </Modal>
    </>
  );
};
