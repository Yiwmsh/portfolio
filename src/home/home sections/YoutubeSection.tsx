import { ScrollSection, SemanticColors } from "@yiwmsh/react-carpentry";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const YoutubeSectionGrid = styled.div`
  display: grid;
  height: 100%;
  width: 90%;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 6fr 1fr;
  align-items: center;
  grid-gap: 5px;
  margin: 0px 5%;

  --GridColumnWidth: calc((100vh * 0.9) / 5);
`;

const YoutubeTitleArea = styled.div`
  grid-row: 1;
  grid-column: 2;
  text-align: center;
`;

const YoutubeBioContainer = styled(motion.div)<{ focussed: boolean }>`
  display: inline-block;
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: ${({ focussed }) => (focussed ? "1 / span 2" : "1")};
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  overflow: hidden;
`;

const YoutubeVideosContainer = styled(motion.div)<{ focussed: boolean }>`
  display: inline-block;
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  overflow: hidden;
`;

export const YoutubeSection: React.FC = () => {
  const [playlist, setPlaylist] = React.useState(undefined);
  const [bioFocussed, setBioFocussed] = React.useState(true);

  React.useEffect(() => {
    const getYoutubePlaylistVideos = async () => {
      const YOUTUBE_API_KEY = await process.env.REACT_APP_youtubeAPIKey;

      const YOUTUBE_PLAYLIST_ITEMS_API =
        "https://www.googleapis.com/youtube/v3/playlistItems";

      const YOUTUBE_PLAYLIST_ID = "PLVnN9RqB5lrxLXVLlz-JCp_CrstjB3pLN";

      const YOUTUBE_MAX_RESULTS = 50;

      const res = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${YOUTUBE_MAX_RESULTS}&playlistId=${YOUTUBE_PLAYLIST_ID}`
      );
      const data = await res.json();

      setPlaylist(data);
      console.log(YOUTUBE_API_KEY);
      console.log(res);
      console.log(data);
    };
    if (!playlist) {
      getYoutubePlaylistVideos();
    }
  }, []);
  return (
    <ScrollSection>
      <YoutubeSectionGrid>
        <YoutubeTitleArea>
          <h1>Music</h1>
        </YoutubeTitleArea>
        <YoutubeBioContainer
          layout
          focussed={bioFocussed}
          onClick={() => setBioFocussed(!bioFocussed)}
        >
          <motion.img
            layout
            src="https://images.unsplash.com/photo-1438021258176-43efc14c67dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          />
        </YoutubeBioContainer>
        <YoutubeVideosContainer
          layout
          focussed={!bioFocussed}
          onClick={() => setBioFocussed(!bioFocussed)}
        >
          <motion.img
            layout
            src="https://images.unsplash.com/photo-1591788114651-5156119de596?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          />
        </YoutubeVideosContainer>
      </YoutubeSectionGrid>
    </ScrollSection>
  );
};
