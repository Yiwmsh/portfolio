import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";

const YoutubeVideoContainer = styled(motion.div)<{ focussed: boolean }>``;

export const YoutubeVideo: React.FC<{
  title: string;
  thumbnailSrc: string;
  videoID: string;
}> = ({ title, thumbnailSrc, videoID }) => {
  const [focussed, setFocussed] = React.useState(false);

  return (
    <YoutubeVideoContainer
      focussed={focussed}
      layout
      onClick={() => setFocussed(!focussed)}
    >
      {!focussed && <></>}
      {focussed && <></>}
    </YoutubeVideoContainer>
  );
};
