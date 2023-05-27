import { SwiperSlide } from "swiper/react";
import MediaItem from "../MediaItem";
import AutoSwiper from "../AutoSwiper";

import { MovieResult } from "../../../types/movie";
import { TvSerieResult } from "../../../types/tv";
import { TMDB } from "../../../types/tmdb";

type Props = {
  medias: MovieResult[] | TvSerieResult[];
  mediaType: TMDB["mediaType"];
};

const RecommendSlide = ({ medias, mediaType }: Props) => {
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
