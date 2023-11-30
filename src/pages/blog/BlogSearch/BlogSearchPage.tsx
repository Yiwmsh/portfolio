import { Button, SemanticColors, TextField } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { BlogPostQuery } from "../../../components/BlogPostTools";
import { BlogSearchResults } from "./BlogSearchResults";

const BlogSearchControls = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid var(${SemanticColors.primary});
  max-width: 50%;
  padding: 20px;
  margin: 20px auto;
  gap: 20px;
`;

const BlogSearchSubmitButtonWrapper = styled(Button)`
  align-self: center;
`;

export const BlogSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleSearch, setTitleSearch] = React.useState("");
  const [tagSearch, setTagSearch] = React.useState("");

  const query: BlogPostQuery = React.useMemo(() => {
    const title = searchParams.get("title");
    const tags = searchParams.getAll("tag");
    return {
      title: title,
      tags: tags,
    };
  }, [searchParams]);

  React.useEffect(() => {
    setTitleSearch(searchParams.get("title") ?? "");
    setTagSearch(searchParams.getAll("tag").join(", ") ?? "");
  }, [searchParams]);

  return (
    <div>
      <BlogSearchControls>
        <TextField
          label={"Title"}
          value={titleSearch}
          onChange={setTitleSearch}
          placeholder="Search by title"
        />
        <TextField
          label={"Tags (comma separated)"}
          value={tagSearch}
          onChange={setTagSearch}
          placeholder="Tag 1, Tag 2, Tag 3, Tag 4"
        />
        <BlogSearchSubmitButtonWrapper
          onPress={() => {
            const params: URLSearchParamsInit = {};

            if (titleSearch !== "") {
              params["title"] = titleSearch;
            }

            if (tagSearch !== "") {
              params["tag"] = tagSearch.split(",").map((tag) => tag.trim());
            }

            setSearchParams(params);
          }}
        >
          Search!
        </BlogSearchSubmitButtonWrapper>
      </BlogSearchControls>
      <BlogSearchResults query={query} />
    </div>
  );
};
