import { SemanticColors, TextContent } from "@chrisellis/react-carpentry";
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

  @media screen and (max-width: 1700px) and (min-width: 600px) {
    width: 98%;
    margin: 0px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr 1fr;
  }

  --GridColumnWidth: calc((100vw * 0.9) / 5);
`;

const MusicBioContainer = styled(motion.div)<{ focussed: boolean }>`
  display: flex;
  flex-direction: ${({ focussed }) => (focussed ? "row" : "column")};
  align-items: ${({ focussed }) => (focussed ? "center" : "start")};
  width: 100%;
  height: 100%;
  grid-row: 2;
  @media screen and (min-width: 600px) {
    grid-column: ${({ focussed }) => (focussed ? "1 / span 2" : "1")};
  }

  @media screen and (max-width: 600px) {
    grid-row: ${({ focussed }) => (focussed ? "1 / span 2" : "1")};
    flex-direction: row;
    ${({ focussed }) => (focussed ? "" : "justify-content: space-between;")}
  }
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);
  overflow: hidden;
`;

const YoutubeVideo = styled(motion.iframe)<{ focussed: boolean }>`
  box-shadow: 5px 5px 2px var(${SemanticColors.shadow});
  border-radius: 10px;
  border: 0px;
  width: clamp(20px, 100%, 323px);
  max-width: 323px;
  aspect-ratio: 16 / 9;

  @media screen and (max-width: 1500px) {
    max-width: 100%;
    ${({ focussed }) => (focussed ? "" : "display: none;")};
  }

  @media screen and (max-height: 1060px) {
    ${({ focussed }) => (focussed ? "" : "display: none;")};
  }
`;

const YoutubeVideosContainer = styled(motion.div)<{ focussed: boolean }>`
  height: 70vh;
  display: flex;
  flex-direction: ${({ focussed }) => (focussed ? "row" : "column")};
  flex-wrap: ${({ focussed }) => (focussed ? "wrap" : "none")};
  overflow-x: scroll;

  align-content: start;

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
  @media screen and (min-width: 600px) {
    grid-column: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
  }

  @media screen and (max-width: 600px) {
    grid-row: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
    height: 90%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MusicPic = styled(motion.img)<{ focussed: boolean }>`
  border-radius: 10px;
  box-shadow: 5px 5px 2px var(${SemanticColors.shadow});
  width: ${({ focussed }) =>
    focussed
      ? "calc((var(--GridColumnWidth) * 2) - 10px)"
      : "calc(var(--GridColumnWidth) - 20px)"};
  aspect-ratio: 10 / 13;
  margin: ${({ focussed }) => (focussed ? "0 0 0 5px" : "5px auto")};

  @media screen and (max-width: 600px) {
    max-height: 90%;
    margin: auto 5px;
    max-width: 30%;
    width: unset;
  }
`;

const MusicBio = styled(motion.div)<{ focussed: boolean }>`
  margin: 5%;
  overflow-y: auto;
  max-height: 100%;

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-height: 1060px) {
    padding-right: 5px;
    ${({ focussed }) => (focussed ? "" : "display: none;")}
  }
`;

const IndentedSection = styled.div`
  padding-left: 20px;
`;

const BioTitle = styled(motion.div)<{ focussed: boolean }>`
  display: none;
  align-items: center;
  height: 100%;

  @media screen and (max-height: 1060px) {
    ${({ focussed }) => (focussed ? "display: none" : "display: flex")};
    margin: auto;
  }

  @media screen and (max-width: 600px) {
    ${({ focussed }) => (focussed ? "display: none" : "display: flex")};
    margin: 0;
  }
`;

const VideosTitle = styled.h3<{ focussed: boolean }>`
  display: none;
  margin: auto;
  @media screen and (max-width: 1500px) {
    ${({ focussed }) => (focussed ? "display: none" : "display: inline")};
  }
  @media screen and (max-height: 1060px) {
    ${({ focussed }) => (focussed ? "display: none" : "display: inline")};
  }
`;

const InvisibleSpacer = styled(MusicPic)`
  visibility: hidden;
  display: none;
  @media screen and (max-width: 600px) {
    display: inline;
  }
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
          <BioTitle focussed={bioFocussed}>
            <TextContent>
              <h3>Bio</h3>
            </TextContent>
          </BioTitle>
          <InvisibleSpacer
            aria-hidden
            layout
            alt="I am sitting on my bed playing guitar while looking at tabs on my phone."
            src={musicPic}
            focussed={bioFocussed}
          />
          <MusicBio focussed={bioFocussed} layout>
            <TextContent>
              <p>
                I've been playing music for a really long time. I started with
                saxophone for a year, back in elementary school, then swapped to
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
                around the time I got my ADHD diagnoses, and was prescribed
                medication for it, which meant that I had near unlimited focus
                and drive. I remember one day I sat outside playing for about
                six hours in a row, without realizing I was getting sunburnt.
              </p>
              {bioFocussed && (
                <IndentedSection>
                  <p>
                    I started out on acoustic guitar, learning plenty of folk
                    songs alongside classics like Wish You Were Here, Hey There
                    Delilah, and Hallelujah. I often ask my friends to recommend
                    songs for me to learn, which I've found is a great way to
                    stay motivated and discover new music.
                  </p>
                </IndentedSection>
              )}
              <p>
                While I lack a formal music education, and I have yet to teach
                myself much music theory, I aspire to create all sorts of music
                in my future. I have written a couple of simple melodies and
                chord changes already, and my authorial tendencies have lent
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
          <VideosTitle focussed={!bioFocussed}>
            <TextContent>Videos</TextContent>
          </VideosTitle>
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
