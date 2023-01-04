import React from "react";
import { BlogPostProps } from "../admin";
import { Card } from "@chrisellis/react-carpentry";

export const BlogPost: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  return <Card centered="both" width="80%" height="80%"></Card>;
};
