import { ScrollSection } from "@yiwmsh/react-carpentry";
import React from "react";

export const YoutubeSection: React.FC = () => {
  const [playlist, setPlaylist] = React.useState(undefined);

  React.useEffect(() => {
    const getYoutubePlaylistVideos = async () => {
      const YOUTUBE_API_KEY = await process.env.youtubeAPIKey;

      const YOUTUBE_PLAYLIST_ITEMS_API =
        "https://www.googleapis.com/youtube/v3/playlistItems";

      const YOUTUBE_PLAYLIST_ID =
        "yZCzlchwJZg&list=PLVnN9RqB5lrxLXVLlz-JCp_CrstjB3pLN";

      const YOUTUBE_MAX_RESULTS = 50;

      const res = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?key=${YOUTUBE_API_KEY}?part=snippet&maxResults=${YOUTUBE_MAX_RESULTS}&playlistId=${YOUTUBE_PLAYLIST_ID}`
      );
      const data = await res.json();

      setPlaylist(data);
      console.log(playlist);
    };
    if (!playlist) {
      getYoutubePlaylistVideos();
    }
  }, []);
  return <ScrollSection></ScrollSection>;
};
