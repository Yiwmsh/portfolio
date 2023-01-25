import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { BlogPostProps } from "../pages/admin";

const blogPosts = collection(
  db,
  process.env.REACT_APP_blogPostCollection ?? "blog-posts"
);
export const wherePublished = where("publish", "==", true);

export const GetAllBlogPosts = async (
  published: boolean
): Promise<BlogPostProps[]> => {
  return await GetBlogPostsByQuery(published);
};

export const GetFrontPageBlogPosts = async (): Promise<BlogPostProps[]> => {
  const frontPageBlogPosts: BlogPostProps[] = [];

  const q = query(
    blogPosts,
    wherePublished,
    where("featuredPriority", "!=", null),
    orderBy("featuredPriority", "desc"),
    orderBy("publishedDate", "desc")
  );
  const response = await getDocs(q);

  for (let i = 0; i < response.size; i++) {
    try {
      const docData = (await response.docs[i].data()) as BlogPostProps;
      frontPageBlogPosts.push(docData);
    } catch (e) {
      console.log(e);
    }
  }

  return frontPageBlogPosts;
};

export const GetAllPublishedBlogPosts = async (): Promise<BlogPostProps[]> => {
  const allPublishedPosts: BlogPostProps[] = [];

  const q = query(blogPosts, wherePublished);
  const response = await getDocs(q);

  for (let i = 0; i < response.size; i++) {
    try {
      const docData = (await response.docs[i].data()) as BlogPostProps;
      allPublishedPosts.push(docData);
    } catch (e) {
      console.log(e);
    }
  }

  return allPublishedPosts;
};

export const GetRecentPublishedBlogPosts = async (): Promise<
  BlogPostProps[]
> => {
  const allPublishedPosts: BlogPostProps[] = [];

  const q = query(
    blogPosts,
    wherePublished,
    where("publishedDate", "!=", "null"),
    orderBy("publishedDate", "desc")
  );
  const response = await getDocs(q);

  for (let i = 0; i < response.size; i++) {
    try {
      const docData = (await response.docs[i].data()) as BlogPostProps;
      allPublishedPosts.push(docData);
    } catch (e) {
      console.log(e);
    }
  }

  return allPublishedPosts;
};

export const GetBlogPostsByQuery = async (
  published: boolean,
  searchString?: string
): Promise<BlogPostProps[]> => {
  const allMatchingPosts: BlogPostProps[] = [];

  const addDocsToReturnArray = async (
    firestoreResponse: QuerySnapshot<DocumentData>
  ) => {
    for (let i = 0; i < firestoreResponse.size; i++) {
      try {
        const docData = (await firestoreResponse.docs[
          i
        ].data()) as BlogPostProps;
        allMatchingPosts.push(docData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!searchString || searchString === "") {
    const response = await getDocs(blogPosts);
    await addDocsToReturnArray(response);
  } else {
    const titleQuery = published
      ? query(blogPosts, wherePublished, where("title", ">=", searchString))
      : query(blogPosts, where("title", ">=", searchString));
    const titleRes = await getDocs(titleQuery);
    await addDocsToReturnArray(titleRes);
    const tagQuery = published
      ? query(
          blogPosts,
          wherePublished,
          where("tags", "array-contains", searchString)
        )
      : query(blogPosts, where("tags", "array-contains", searchString));
    const tagRes = await getDocs(tagQuery);
    await addDocsToReturnArray(tagRes);
    const seriesQuery = published
      ? query(
          blogPosts,
          wherePublished,
          where("series", "array-contains", searchString)
        )
      : query(blogPosts, where("series", "array-contains", searchString));
    const seriesRes = await getDocs(seriesQuery);
    await addDocsToReturnArray(seriesRes);
  }

  return allMatchingPosts;
};

export const SortBlogPosts = (
  posts: BlogPostProps[],
  field: keyof BlogPostProps,
  direction: "asc" | "desc"
): BlogPostProps[] => {
  return [...posts].sort((a, b) => {
    const aProp = a[field];
    const bProp = b[field];
    return !aProp || !bProp ? 0 : aProp > bProp ? -1 : 1;
  });
};

export const removeTags = (content: string) => {
  const tagPattern = /(<[^<>]*>)/gm;
  return content.replaceAll(tagPattern, "");
};
