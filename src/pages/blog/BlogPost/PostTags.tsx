import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const TagsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  place-content: center;
`;

const TagTitle = styled.div``;

const TagsList = styled.div``;

const Tag = styled(motion.a)`
  margin: 0 2px;
  padding: 0 3px;
  background: var(${SemanticColors.shadow});
  border-radius: 5px;
  text-decoration: none;
  &:visited,
  &:link {
    color: var(${SemanticColors.text});
  }
`;

export const PostTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <TagsRow>
      <TagTitle>Tags: </TagTitle>
      <TagsList>
        {tags.map((tag) => (
          <Tag
            whileHover={{
              padding: "0 5px",
              color: `var(${SemanticColors.secondary})`,
              fontWeight: "bold",
            }}
            href=""
          >
            {tag}
          </Tag>
        ))}
      </TagsList>
    </TagsRow>
  );
};
