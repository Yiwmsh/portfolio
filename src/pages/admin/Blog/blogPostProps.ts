import { Timestamp } from "firebase/firestore";

export interface BlogPostID {
  uid: string;
  title: string;
}

export interface BlogPostProps {
  uid: string;
  title: string;
  metaTitle?: string;
  slug?: string;
  authors: string[];
  content: string;
  summary: string;
  createdDate?: Timestamp;
  lastUpdated?: Timestamp;
  publish: boolean;
  publishedDate?: Timestamp | null;
  relatedPosts?: string[];
  series?: string[];
  tags?: string[];
  featuredPriority: number;
}
