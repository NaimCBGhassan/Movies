import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";
import { TMDB } from "../../types/tmdb";
import { MovieResult } from "../../types/movie";
import { TvSerieResult } from "../../types/tv";

type Props = {
  medias: (MovieResult | TvSerieResult)[];
  mediaType: TMDB["mediaType"];
};

const MediaGrid = ({ medias, mediaType }: Props) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {medias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
