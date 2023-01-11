import React from "react";
import styled from "@emotion/styled";
import { BlogPostProps } from "../pages/admin";
import {
  collection,
  where,
  orderBy,
  getDocs,
  query,
  getDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

export const GetBlogPostsByQuery = async (
  searchString?: string
): Promise<BlogPostProps[]> => {
  const allMatchingPosts: BlogPostProps[] = [];
  const blogPosts = collection(db, "blog-posts");

  const addDocsToReturnArray = async (
    firestoreResponse: QuerySnapshot<DocumentData>
  ) => {
    for (let i = 0; i < firestoreResponse.size; i++) {
      try {
        const docData = (await firestoreResponse.docs[
          i
        ].data()) as BlogPostProps;
        console.log(docData);
        allMatchingPosts.push(docData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!searchString) {
    const response = await getDocs(blogPosts);
    addDocsToReturnArray(response);
  } else {
    console.log("Querying by name");
    const titleQuery = query(blogPosts, where("title", ">=", searchString));
    const titleRes = await getDocs(titleQuery);
    addDocsToReturnArray(titleRes);
    const tagQuery = query(
      blogPosts,
      where("tags", "array-contains", searchString)
    );
    const tagRes = await getDocs(tagQuery);
    addDocsToReturnArray(tagRes);
    const seriesQuery = query(
      blogPosts,
      where("series", "array-contains", searchString)
    );
    const seriesRes = await getDocs(seriesQuery);
    addDocsToReturnArray(seriesRes);
  }

  console.log("Finished");

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
