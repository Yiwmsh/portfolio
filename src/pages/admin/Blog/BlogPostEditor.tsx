import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextContent,
  TextField,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { BlogPostProps } from "./blogPost";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  CenteringButtonBank,
  Row,
} from "../../home/home sections/WelcomeModal";

const BlogPostEditorCard = styled(Card)`
  @media screen and (min-width: 500px) {
    width: 80vw;
  }
`;

const BlogPostContentInput = styled.textarea`
  min-height: 20vh;
  resize: both;
`;

const TitleField = styled.div`
  width: 80%;
`;

const TitleCardHeader = styled(CardHeader)`
  justify-content: center;
  display: flex;
`;

const parseCommaDelineatedString = (input: string) => {
  const items = input.split(",");
  for (let i = 0; i < items.length; i++) {
    items[i] = items[i].trim();
  }
  return items;
};

enum ValidationStateOption {
  Valid = "valid",
  Invalid = "invalid",
}

export const BlogPostEditor: React.FC<{ post?: BlogPostProps }> = ({
  post,
}) => {
  const postData = { ...post };
  const [title, setTitle] = React.useState(postData?.title ?? "");
  const [metaTitle, setMetaTitle] = React.useState(postData?.metaTitle ?? "");
  const [slug, setSlug] = React.useState(postData?.slug ?? "");
  const [authors, setAuthors] = React.useState(postData?.authors ?? ["Whimsy"]);
  const [content, setContent] = React.useState(postData?.content ?? "");
  const [publish, setPublish] = React.useState(postData?.publish ?? false);
  const [publishedDate, setPublishedDate] = React.useState<Timestamp | null>(
    postData?.publishedDate ?? null
  );
  const [series, setSeries] = React.useState(postData?.series ?? []);
  const [related, setRelated] = React.useState(postData?.relatedPosts ?? []);
  const [tags, setTags] = React.useState(postData?.tags ?? []);

  const [uploadSuccess, setUploadSuccess] = React.useState<boolean | undefined>(
    undefined
  );

  const [titleValidity, setTitleValidity] = React.useState(
    ValidationStateOption.Invalid
  );
  const [titleErrorMessage, setTitleErrorMessage] = React.useState("");

  const submitBlogPost = async () => {
    if (titleValidity === ValidationStateOption.Valid) {
      if (publish && !publishedDate) {
        setPublishedDate(Timestamp.now());
      }
      await setDoc(doc(db, "blog-posts", title), {
        title: title,
        createdDate: postData?.createdDate ?? Timestamp.now(),
        lastUpdated: Timestamp.now(),
        metaTitle: metaTitle === "" ? title : metaTitle,
        slug: slug === "" ? title : slug,
        authors: authors,
        content: content,
        publish: publish,
        publishedDate: publishedDate ?? null,
        views: postData?.views ?? 0,
        series: series,
        related: related,
        tags: tags,
      });
    }
  };

  const validateTitle = (title: string) => {
    if (title === "") {
      setTitleValidity(ValidationStateOption.Invalid);
      setTitleErrorMessage("Title cannot be empty.");
    } else {
      setTitleValidity(ValidationStateOption.Valid);
      setTitleErrorMessage("");
    }
  };

  React.useEffect(() => {
    setTitle(post?.title ?? "");
    setMetaTitle(post?.metaTitle ?? "");
    setSlug(post?.slug ?? "slug");
    setAuthors(post?.authors ?? ["Whimsy"]);
    setContent(post?.content ?? "");
    setPublish(post?.publish ?? false);
    setPublishedDate(post?.publishedDate ?? null);
    setSeries(post?.series ?? []);
    setRelated(post?.relatedPosts ?? []);
    setTags(post?.tags ?? []);
  }, [post]);

  return (
    <BlogPostEditorCard>
      <TitleCardHeader>
        <TitleField>
          <TextField
            label="Title"
            value={title}
            onChange={(value) => {
              validateTitle(value);
              setTitle(value);
            }}
            errorMessage={titleErrorMessage}
            isRequired
            validationState={titleValidity}
          />
        </TitleField>
      </TitleCardHeader>
      <CardBody>
        <TextField
          label="Author(s)"
          value={authors.join(", ")}
          onChange={(value) => setAuthors(parseCommaDelineatedString(value))}
        />
        <TextContent>
          <label htmlFor="content">Content</label>
        </TextContent>
        <BlogPostContentInput
          name="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <PublishRow
          publish={publish}
          setPublish={setPublish}
          publishedDate={publishedDate}
          setPublishedDate={setPublishedDate}
        />
        <TextField
          label="Tags"
          value={tags.join(", ")}
          onChange={(value) => {
            setTags(parseCommaDelineatedString(value));
          }}
        />
        <TextField
          label="Related"
          value={related.join(", ")}
          onChange={(value) => {
            setRelated(parseCommaDelineatedString(value));
          }}
        />
        <TextField
          label="Series"
          value={series.join(", ")}
          onChange={(value) => {
            setSeries(parseCommaDelineatedString(value));
          }}
        />
      </CardBody>
      <CardFooter>
        <CenteringButtonBank>
          <Button onPress={() => submitBlogPost()}>Submit</Button>
        </CenteringButtonBank>
      </CardFooter>
    </BlogPostEditorCard>
  );
};

const PublishRow: React.FC<{
  publish: boolean;
  setPublish: (value: boolean) => void;
  publishedDate: Timestamp | null;
  setPublishedDate: (value: Timestamp | null) => void;
}> = ({ publish, setPublish, publishedDate, setPublishedDate }) => {
  return (
    <Row>
      <TextContent>
        <label htmlFor="publish">Publish?</label>
        <input
          name="publish"
          type="checkbox"
          checked={publish}
          onChange={(event) => setPublish(!publish)}
        />
        {publish ? (
          <>
            {" | "}
            <label htmlFor="publish-date">Publish Date (UTC): </label>
            <input
              name="publish-date"
              type="datetime-local"
              value={
                publishedDate
                  ? publishedDate.toDate().toISOString().slice(0, 16)
                  : new Date().toISOString().slice(0, 16)
              }
              onChange={(event) => {
                const value = event.target.value;
                console.log(value);
                const date = new Date(value);
                console.log(date);
                const timestamp = Timestamp.fromDate(date);
                console.log(timestamp.toDate().toISOString);
                setPublishedDate(timestamp);
              }}
            />
          </>
        ) : (
          ""
        )}
      </TextContent>
    </Row>
  );
};
