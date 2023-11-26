import { getDocs, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { blogPostsTagSource } from "../components/BlogPostTools";

export const useBlogPostTags = () =>
  useQuery("tags", async () => {
    const q = query(blogPostsTagSource);
    const response = await getDocs(q);
    const data = response.docs.map((doc) => {
      return (doc.data() as { tag: string }).tag;
    });
    return data;
  });
