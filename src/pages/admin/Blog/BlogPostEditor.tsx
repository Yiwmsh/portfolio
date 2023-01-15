import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextContent,
  TextField,
  SemanticColors,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { BlogPostID, BlogPostProps } from "./blogPostProps";
import { setDoc, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  CenteringButtonBank,
  Row,
} from "../../home/home sections/WelcomeModal";
import { fancyDisplayTimestamp } from "../../blog/BlogPost/BlogPost";
import { v4 as uuidv4 } from "uuid";

const BlogPostEditorCard = styled(Card)`
  @media screen and (min-width: 500px) {
    width: 80vw;
  }
`;

const ErrorMessage = styled.p`
  color: var(${SemanticColors.error});
`;

const BlogPostContentInput = styled.textarea`
  min-height: 20vh;
  resize: both;
`;

const BlogPostSummaryInput = styled.textarea`
  min-height: 10vh;
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

const slugifyTitle = (title: string): string => {
  return title.toLowerCase().replaceAll(" ", "-");
};

export const BlogPostEditor: React.FC<{
  post?: BlogPostProps;
  newPost: (newPost: BlogPostID) => void;
  postDeleted: () => void;
}> = ({ post, newPost, postDeleted }) => {
  const postData = { ...post };
  const [uid, setUid] = React.useState(postData?.uid ?? uuidv4());
  const [title, setTitle] = React.useState(postData?.title ?? "");
  const [metaTitle, setMetaTitle] = React.useState(postData?.metaTitle ?? "");
  const [slug, setSlug] = React.useState(postData?.slug ?? "");
  const [authors, setAuthors] = React.useState(postData?.authors ?? ["Whimsy"]);
  const [summary, setSummary] = React.useState(postData?.summary ?? "");
  const [content, setContent] = React.useState(postData?.content ?? "");
  const [publish, setPublish] = React.useState(postData?.publish ?? false);
  const [publishedDate, setPublishedDate] = React.useState<Timestamp | null>(
    postData?.publishedDate ?? null
  );
  const [series, setSeries] = React.useState(postData?.series ?? []);
  const [related, setRelated] = React.useState(postData?.relatedPosts ?? []);
  const [tags, setTags] = React.useState(postData?.tags ?? []);
  const [lastUpdated, setLastUpdated] = React.useState<Timestamp | undefined>(
    postData?.lastUpdated ?? undefined
  );
  const [featuredPriority, setFeaturedPriorty] = React.useState(
    post?.featuredPriority ?? 0
  );

  const [slugMatchesTitle, setSlugMatchesTitle] = React.useState(true);

  const [titleValidity, setTitleValidity] = React.useState<
    ValidationStateOption | undefined
  >();
  const [titleErrorMessage, setTitleErrorMessage] = React.useState("");

  const submitBlogPost = async () => {
    let pubDate = publishedDate;
    validateTitle(title);
    if (titleValidity === ValidationStateOption.Valid) {
      if (publish && (publishedDate === undefined || publishedDate === null)) {
        pubDate = Timestamp.now();
      }
      await setDoc(doc(db, "blog-posts", uid), {
        uid: uid,
        title: title,
        createdDate: postData?.createdDate ?? Timestamp.now(),
        lastUpdated: Timestamp.now(),
        metaTitle: metaTitle === "" ? title : metaTitle,
        slug: slugifyTitle(slug === "" ? title : slug),
        authors: authors,
        content: content,
        summary: summary,
        publish: publish,
        publishedDate: publish ? pubDate ?? null : null,
        series: series,
        related: related,
        tags: tags,
        featuredPriority: featuredPriority,
      });
      const uploadedSuccessfully = await checkUploadSuccess();
      if (uploadedSuccessfully) {
        if (!postData.uid) {
          newPost({ title: title, uid: uid });
        }
      }
    }
  };

  const checkUploadSuccess = async (): Promise<boolean> => {
    const response = await getDoc(doc(db, "blog-posts", uid));
    try {
      const serverLastUpdatedPost = ((await response.data()) as BlogPostProps)
        .lastUpdated;
      if (serverLastUpdatedPost !== lastUpdated) {
        setLastUpdated(serverLastUpdatedPost);
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  const deleteBlogPost = async () => {
    if (uid) {
      await deleteDoc(doc(db, "blog-posts", uid));
      postDeleted();
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
    setUid(post?.uid ?? uuidv4());
    setTitle(post?.title ?? "");
    setMetaTitle(post?.metaTitle ?? "");
    setSlug(post?.slug ?? "slug");
    setAuthors(post?.authors ?? ["Whimsy"]);
    setSummary(post?.summary ?? "");
    setContent(post?.content ?? "");
    setPublish(post?.publish ?? false);
    setPublishedDate(post?.publishedDate ?? null);
    setSeries(post?.series ?? []);
    setRelated(post?.relatedPosts ?? []);
    setTags(post?.tags ?? []);
    setLastUpdated(post?.lastUpdated);
    setFeaturedPriorty(post?.featuredPriority ?? 0);
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
              if (slugMatchesTitle) {
                setSlug(slugifyTitle(value));
              }
            }}
            errorMessage={titleErrorMessage}
            isRequired
            validationState={titleValidity}
          />
        </TitleField>
      </TitleCardHeader>
      <CardBody>
        <Row>
          <p>
            Post Created:{" "}
            {post?.createdDate ? fancyDisplayTimestamp(post?.createdDate) : ""}
          </p>
          <p>·</p>
          <p>
            Last Updated:{" "}
            {lastUpdated ? fancyDisplayTimestamp(lastUpdated) : ""}
          </p>
        </Row>
        <TextField
          label="Meta Title"
          value={metaTitle}
          onChange={(value) => setMetaTitle(value)}
        />
        <Row>
          <TextField
            label="Slug"
            value={slug}
            isDisabled={slugMatchesTitle}
            onChange={(value) => {
              setSlug(slugifyTitle(value));
            }}
          />
          <TextContent>
            <label htmlFor="slug-matches-title">Slug matches title?</label>
          </TextContent>
          <input
            name="slug-matches-title"
            type="checkbox"
            checked={slugMatchesTitle}
            onChange={(event) => {
              setSlugMatchesTitle(!slugMatchesTitle);
              setSlug(slugifyTitle(title));
            }}
          />
        </Row>
        <TextField
          label="Author(s)"
          value={authors.join(", ")}
          onChange={(value) => setAuthors(parseCommaDelineatedString(value))}
        />
        <TextContent>
          <label htmlFor="summary">Summary</label>
        </TextContent>
        <BlogPostSummaryInput
          name="summary"
          value={summary}
          onChange={(event) => {
            setSummary(event.target.value);
          }}
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
        <TextField
          label="Featured Priority"
          type="number"
          value={`${featuredPriority}`}
          onChange={(value) => {
            try {
              setFeaturedPriorty(parseInt(value));
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </CardBody>
      <CardFooter>
        {titleValidity === ValidationStateOption.Invalid ? (
          <ErrorMessage>You must enter a title!</ErrorMessage>
        ) : (
          ""
        )}
        <CenteringButtonBank>
          <Button onPress={() => submitBlogPost()}>Submit</Button>
          <Button onPress={() => deleteBlogPost()}>Delete</Button>
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
                const date = new Date(value);
                const timestamp = Timestamp.fromDate(date);
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
