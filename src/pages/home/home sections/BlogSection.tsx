import { CenteringSection } from "../../../components/CenteringSection";
import { ScrollButton } from "../../../components/ScrollButton";
import React from "react";

export const BlogSection: React.FC = () => {
  return (
    <CenteringSection id="Blog">
      <ScrollButton direction="up" target="Music" />
      {/* <ScrollButton direction="down" target="" /> */}
    </CenteringSection>
  );
};
