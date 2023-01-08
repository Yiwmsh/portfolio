import { Timestamp } from "firebase/firestore";

export interface BlogPostProps {
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
    views?: number;
}