import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { posterPath } from "../../../utils/tmdb.config";
import { uiConfigs } from "../../../configs/ui.config";
import { routesGen } from "../../../routes/routes";
import { TvIDCredits } from "../../../types/tv";
import { MoviesIDCredit } from "../../../types/movie";

type Props = {
  casts?: TvIDCredits["cast"] | MoviesIDCredit["cast"];
};

const CastSlide = ({ casts }: Props) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts?.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id.toString())}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  ...uiConfigs.style.backgroundImage(posterPath(cast.profile_path)),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography>{cast.name}</Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
