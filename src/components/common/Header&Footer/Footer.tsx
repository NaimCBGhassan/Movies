import Container from "../Container";
import { Paper, Stack, Box, Button } from "@mui/material/";
import Logo from "../Logo";
import menuConfigs from "../../../configs/menu.config";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: " 2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button component={Link} to={item.path} key={index} sx={{ color: "inherit" }}>
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
