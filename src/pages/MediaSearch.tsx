import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import * as MediaApi from "../store/api/media";
import MediaGrid from "../components/common/MediaGrid";
import { uiConfigs } from "../configs/ui.config";
import { TMDB } from "../types/tmdb";
import { isErrorWithMessage } from "../utils/errorNarrowing";
import { MovieResult } from "../types/movie";
import { TvSerieResult } from "../types/tv";

const mediaTypes = ["movie", "tv", "people"] as const;
let timer: number;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState<TMDB["mediaType"]>(mediaTypes[0]);
  const [medias, setMedias] = useState<(MovieResult | TvSerieResult)[]>([]);
  const [page, setPage] = useState(1);

  const { refetch } = MediaApi.useSearchQuery({ mediaType, query, page: page.toString() });

  const search = useCallback(async () => {
    setOnSearch(true);

    const { data, error } = await refetch();

    setOnSearch(false);

    if (error && isErrorWithMessage(error)) toast.error(error.message);
    if (data) {
      if (page > 1) setMedias((m) => [...m, ...data.results]);
      else setMedias([...data.results]);
    }
  }, [refetch, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory: TMDB["mediaType"]) => setMediaType(selectedCategory);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" justifyContent="center" sx={{ width: "100%" }}>
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color: mediaType === item ? "primary.contrastText" : "text.primary",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
