import { Button, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import * as PersonApi from "../../../store/api/person";
import MediaItem from "../MediaItem";
import { toast } from "react-toastify";
import { isErrorWithMessage } from "../../../utils/errorNarrowing";
import { Cast } from "../../../types/person";
import { TMDB } from "../../../types/tmdb";

const PersonMediaGrid = ({ personId }: { personId: string }) => {
  const [filteredMedias, setFilteredMedias] = useState<Cast[]>([]);
  const [page, setPage] = useState(1);
  const skip = 8;
  const { data: medias, error } = PersonApi.useGetPersonMediaQuery({ personId });

  const mediasSorted = useMemo<Cast[]>(() => {
    if (medias) {
      return [...medias.cast].sort((a, b) => {
        return getReleaseDate(b) - getReleaseDate(a);
      });
    }
    return [];
  }, [medias]);

  useEffect(() => {
    if (error && isErrorWithMessage(error)) toast.error(error.message);
    if (medias) {
      setFilteredMedias(mediasSorted.slice(0, skip));
    }
  }, [error, medias, mediasSorted]);

  const onLoadMore = () => {
    setFilteredMedias(mediasSorted.slice(0, (page + 1) * skip));
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type as TMDB["mediaType"]} />
          </Grid>
        ))}
      </Grid>
      {medias?.cast && filteredMedias.length < (medias?.cast as Cast[]).length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;

const getReleaseDate = (media: Cast) => {
  if ("release_date" in media && media.release_date !== "" && media.release_date)
    return new Date(media.release_date).getTime();

  if ("first_air_date" in media && media.first_air_date !== "" && media.first_air_date)
    return new Date(media.first_air_date).getTime();

  return 1;
};
