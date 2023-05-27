import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { youtubePath } from "../../../utils/tmdb.config";
import { MoviesIDVideo } from "../../../types/movie";
import { TvIDVideo } from "../../../types/tv";
import NavigationSwiper from "./NavigationSwiper";

type Props1 = {
  videos: MoviesIDVideo["results"] | TvIDVideo["results"];
};

type Props2 = {
  video: MoviesIDVideo["results"][number] | TvIDVideo["results"][number];
};

const MediaVideo = ({ video }: Props2) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, []);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.key}
        src={youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      />
    </Box>
  );
};

const MediaVideoSlide = ({ videos }: Props1) => {
  return (
    <NavigationSwiper>
      {videos?.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideoSlide;
