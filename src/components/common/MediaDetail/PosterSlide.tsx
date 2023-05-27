import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { posterPath } from "../../../utils/tmdb.config";
import { TvIDImages } from "../../../types/tv";
import { MoviesIDImages } from "../../../types/movie";
import AutoSwiper from "../AutoSwiper";

type Props = {
  posters: TvIDImages["posters"] | MoviesIDImages["posters"];
};
const PosterSlide = ({ posters }: Props) => {
  return (
    <AutoSwiper>
      {posters.slice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${posterPath(item.file_path)})`,
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
