import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PersonMediaGrid from "../components/common/PersonDetail/PersonMediaGrid";
import { posterPath } from "../utils/tmdb.config";
import { uiConfigs } from "../configs/ui.config";
import Container from "../components/common/Container";
import * as PersonApi from "../store/api/person";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../store/slice/globalLoading";
import { isErrorWithMessage } from "../utils/errorNarrowing";

const PersonDetail = () => {
  const { personId } = useParams() as { personId: string };
  const dispatch = useDispatch();

  const { data: person, isLoading, error } = PersonApi.useGetPersonDetailQuery({ personId });

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
    if (error && isErrorWithMessage(error)) toast.error(error.message);
  }, [isLoading, error, dispatch]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${posterPath(person.profile_path)})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${person.birthday && person.birthday.split("-")[0]}`}
                    {person.deathday && ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>{person.biography}</Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
