import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SemanticColors,
  TextContent,
  TextField,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { Timestamp, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { RichTextEditor, removeTags } from "../../../components";
import { db } from "../../../firebase";
import {
  calculateReadingTime,
  fancyDisplayTimestamp,
} from "../../blog/BlogPost/BlogPost";
import {
  CenteringButtonBank,
  Row,
} from "../../home/home sections/WelcomeModal";
import { BlogPostPreviewButton } from "./BlogPostPreviewButton";
import { BlogPostProps } from "./blogPostProps";

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
  changesMade: () => void;
}> = ({ post, changesMade }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
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
      await setDoc(
        doc(db, process.env.REACT_APP_blogPostCollection ?? "blog-posts", uid),
        {
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
          readingTime: calculateReadingTime(removeTags(content)),
        }
      );
      debugger;
      const tagsCollection = process.env.REACT_APP_blogPostTagsCollection;
      if (tagsCollection && publish) {
        tags.forEach((tag) => {
          setDoc(doc(db, tagsCollection, tag), {
            tag: tag,
          });
        });
      }
      const seriesCollection = process.env.REACT_APP_blogPostSeriesCollection;
      if (seriesCollection && publish) {
        series.forEach((series) => {
          setDoc(doc(db, seriesCollection, series), {
            series: series,
          });
        });
      }

      const uploadedSuccessfully = await checkUploadSuccess();
      if (uploadedSuccessfully) {
        changesMade();
      }
    }
  };

  const compilePreview = (): BlogPostProps => {
    return {
      uid: uid,
      title: title,
      metaTitle: metaTitle,
      slug: slug,
      authors: authors,
      content: content,
      summary: summary,
      publish: false,
      featuredPriority: 0,
      readingTime: "placeholder",
    };
  };

  const checkUploadSuccess = async (): Promise<boolean> => {
    const response = await getDoc(
      doc(db, process.env.REACT_APP_blogPostCollection ?? "blog-posts", uid)
    );
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

  const deleteBlogPost = async (uid: string) => {
    if (uid) {
      await deleteDoc(
        doc(db, process.env.REACT_APP_blogPostCollection ?? "blog-posts", uid)
      );
      changesMade();
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
      <DeletePostDialog
        isOpen={deleteDialogOpen}
        closeDialog={() => setDeleteDialogOpen(false)}
        postID={uid}
        deletePost={deleteBlogPost}
      />
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
        <RichTextEditor
          value={content}
          onChange={setContent}
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
          <BlogPostPreviewButton onPress={compilePreview} />
          <Button onPress={() => submitBlogPost()}>Submit</Button>
          <Button onPress={() => setDeleteDialogOpen(true)}>Delete</Button>
        </CenteringButtonBank>
      </CardFooter>
    </BlogPostEditorCard>
  );
};

const DeleteDialog = styled.dialog`
  background-color: var(${SemanticColors.foreground});
  position: fixed;
  top: 0;
  left: 0;
`;

const DeletePostDialog: React.FC<{
  isOpen: boolean;
  closeDialog: () => void;
  postID: string;
  deletePost: (uid: string) => void;
}> = ({ isOpen, closeDialog, postID, deletePost }) => {
  return (
    <DeleteDialog open={isOpen}>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={() => closeDialog()}>Woops, Don't Delete It</button>
      <button
        onClick={() => {
          deletePost(postID);
          closeDialog();
        }}
      >
        Delete It
      </button>
    </DeleteDialog>
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
