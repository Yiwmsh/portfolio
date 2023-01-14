import { BlogPostProps } from "../pages/admin";
import {
  collection,
  where,
  getDocs,
  query,
  QuerySnapshot,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const blogPosts = collection(db, "blog-posts");

export const GetAllBlogPosts = async (): Promise<BlogPostProps[]> => {
  return await GetBlogPostsByQuery();
};

export const GetAllPublishedBlogPosts = async (): Promise<BlogPostProps[]> => {
  const allPublishedPosts: BlogPostProps[] = [];

  const q = query(
    collection(db, "blog-posts"),
    where("publishedDate", "!=", "null")
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

export const GetRecentPublishedBlogPosts = async (): Promise<
  BlogPostProps[]
> => {
  const allPublishedPosts: BlogPostProps[] = [];

  const q = query(
    collection(db, "blog-posts"),
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
    const titleQuery = query(blogPosts, where("title", ">=", searchString));
    const titleRes = await getDocs(titleQuery);
    await addDocsToReturnArray(titleRes);
    const tagQuery = query(
      blogPosts,
      where("tags", "array-contains", searchString)
    );
    const tagRes = await getDocs(tagQuery);
    await addDocsToReturnArray(tagRes);
    const seriesQuery = query(
      blogPosts,
      where("series", "array-contains", searchString)
    );
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
