import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

type Props = {
  children?: React.ReactElement[];
};

const AutoSwiper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
      }}
    >
      <Swiper slidesPerView="auto" grabCursor={true} style={{ width: "100%", height: "max-content" }}>
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
