import { Box } from "@mui/material";
import HeroSlide from "../components/common/HomePage/HeroSlide";
import { uiConfigs } from "../configs/ui.config";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType="movie" mediaCategory="popular" />
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide mediaType="movie" mediaCategory="popular" />
        </Container>
        <Container header="popular series">
          <MediaSlide mediaType="tv" mediaCategory="popular" />
        </Container>
        <Container header="top rated movies">
          <MediaSlide mediaType="movie" mediaCategory="top_rated" />
        </Container>
        <Container header="top rated series">
          <MediaSlide mediaType="tv" mediaCategory="top_rated" />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
