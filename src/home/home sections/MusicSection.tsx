import {
  ScrollSection,
  SemanticColors,
  TextContent,
} from "@yiwmsh/react-carpentry";
import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import musicPic from "../../resources/musicPic.png";
import { CenteringSection } from "../../components/CenteringSection";
import { ScrollButton } from "../../components/ScrollButton";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

const YOUTUBE_PLAYLIST_ID = "PLVnN9RqB5lrxLXVLlz-JCp_CrstjB3pLN";

const YOUTUBE_MAX_RESULTS = 50;

const YOUTUBE_API_KEY = process.env.REACT_APP_youtubeAPIKey;

const MusicSectionGrid = styled.div`
  display: grid;
  height: 70vh;
  width: 90%;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  grid-gap: 10px;
  margin: 0px 5%;

  --GridColumnWidth: calc((100vw * 0.9) / 5);
`;

const MusicBioContainer = styled(motion.div)<{ focussed: boolean }>`
  display: flex;
  flex-direction: ${({ focussed }) => (focussed ? "row" : "column")};
  align-items: ${({ focussed }) => (focussed ? "center" : "start")};
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: ${({ focussed }) => (focussed ? "1 / span 2" : "1")};
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  overflow: hidden;
`;

const YoutubeVideosContainer = styled(motion.div)<{ focussed: boolean }>`
  height: 70vh;
  display: flex;
  flex-direction: ${({ focussed }) => (focussed ? "row" : "column")};
  flex-wrap: ${({ focussed }) => (focussed ? "wrap" : "none")};
  overflow-x: scroll;
  align-items: center;
  align-content: center;
  padding: 10px;
  ${({ focussed }) =>
    focussed
      ? `
  justify-content: center;
  `
      : ""}
  gap: 5px;
  overflow-y: scroll;
  grid-row: 2;
  grid-column: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  scrollbar-width: none;

  &:-webkit-scrollbar {
    display: none;
  }
`;

const MusicPic = styled(motion.img)<{ focussed: boolean }>`
  width: ${({ focussed }) =>
    focussed
      ? "calc((var(--GridColumnWidth) * 2) - 10px)"
      : "calc(var(--GridColumnWidth) - 20px)"};
  padding: 5px 5px 0 5px;
`;

const MusicBio = styled(motion.div)`
  margin: 5%;
`;

const IndentedSection = styled.div`
  padding-left: 20px;
`;

const YoutubeVideo = styled(motion.iframe)<{ focussed: boolean }>`
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  border: 0px;
  width: clamp(20px, 100%, 323px);
  max-width: 323px;
  aspect-ratio: 16 / 9;
`;

export const MusicSection: React.FC = () => {
  const [youtubeVideos, setYoutubeVideos] = React.useState([]);
  const [bioFocussed, setBioFocussed] = React.useState(false);

  React.useEffect(() => {
    const getYoutubePlaylistVids = async () => {
      fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${YOUTUBE_MAX_RESULTS}&playlistId=${YOUTUBE_PLAYLIST_ID}`
      ).then((res) => {
        res.json().then((json: { items: [] }) => {
          setYoutubeVideos((arr) => [...json.items]);
        });
      });
    };

    getYoutubePlaylistVids();
  }, []);

  return (
    <CenteringSection id="Music">
      <ScrollButton direction="up" target="Bio" />
      <MusicSectionGrid>
        <MusicBioContainer
          layout
          focussed={bioFocussed}
          onClick={() => setBioFocussed(!bioFocussed)}
        >
          <MusicPic
            layout
            alt="I am sitting on my bed playing guitar while looking at tabs on my phone."
            src={musicPic}
            focussed={bioFocussed}
          />
          <MusicBio layout>
            <TextContent>
              <p>
                I've been playing music for a really long time. I started with
                saxaphone for a year, back in elementary school, then swapped to
                percussion for two years. But my first real love was the piano,
                which I started teaching myself in 2010, when I was 13.
              </p>
              {bioFocussed && (
                <IndentedSection>
                  <p>
                    I started learning piano on a cheap rollout keyboard, which
                    was only 49 keys and had really stiff sensors. This, as you
                    might imagine, is not an ideal way to learn the instrument.
                    But, as I stuck with it, my parents saw that I was truly
                    dedicated, and for christmas that year they bought me a
                    weighted 88-key keyboard.
                  </p>
                  <p>
                    Unfortunately, pianos - even keyboards - are big and
                    expensive, so my access to one has been pretty intermittent
                    as I've moved around. I've been without one for several
                    years, now, but whenever I come upon one in the wild it
                    never takes me long to shake off the rust.
                  </p>
                </IndentedSection>
              )}
              <p>
                In 2021, I started teaching myself guitar as well. This was
                around the time I got my ADHD diagnoses, and was perscribed
                medication for it, which meant that I had near unlimited focus
                and drive. I remember one day I sat outside playing for about
                six hours in a row, without realizing I was getting sunburnt.
              </p>
              {bioFocussed && (
                <IndentedSection>
                  <p>
                    I started out on accoustic guitar, learning plenty of folk
                    songs alongside classics like Wish You Were Here, Hey There
                    Delilah, and Hallelujah. I often ask my friends to reccomend
                    songs for me to learn, which I've found is a great way to
                    stay motivated and discover new music.
                  </p>
                </IndentedSection>
              )}
              <p>
                While I lack a formal music education, and I have yet to teach
                myself much music theory, I aspire to create all sorts of music
                in my future. I have written a couple of simple melodies and
                chord changes already, and my authorial tendancies have lent
                themselves well to lyricism. I hear beautiful music in my head,
                and as soon as I learn how to manifest it I hope to share it
                with the world.
              </p>
            </TextContent>
          </MusicBio>
        </MusicBioContainer>
        <YoutubeVideosContainer
          layout
          focussed={!bioFocussed}
          onClick={() => setBioFocussed(!bioFocussed)}
        >
          {youtubeVideos.map(
            (video: {
              snippet: { title: string; resourceId: { videoId: string } };
            }) => (
              <YoutubeVideo
                layout
                focussed={!bioFocussed}
                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
              />
            )
          )}
        </YoutubeVideosContainer>
      </MusicSectionGrid>
    </CenteringSection>
  );
};
