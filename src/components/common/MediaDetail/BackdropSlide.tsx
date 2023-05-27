import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { backdropPath } from "../../../utils/tmdb.config";
import NavigationSwiper from "./NavigationSwiper";
import { TvIDImages } from "../../../types/tv";
import { MoviesIDImages } from "../../../types/movie";

type Props = {
  backdrops: TvIDImages["backdrops"] | MoviesIDImages["backdrops"];
};
const BackdropSlide = ({ backdrops }: Props) => {
  return (
    <NavigationSwiper>
      {backdrops.slice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${backdropPath(item.file_path)})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
