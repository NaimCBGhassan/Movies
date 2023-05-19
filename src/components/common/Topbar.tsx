import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import { setAuthModalOpen } from "../../store/slice/authModalSlice";
import { setTheme } from "../../store/slice/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactElement;
};

const ScrollAppBar = ({ children }: Props) => {
  const { theme } = useAppSelector((state) => state.theme);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return cloneElement(children, {
    sx: {
      color: trigger ? "text.primary" : theme === "dark" ? "primary.contrastText" : "text.primary",
      backgroundColor: trigger ? "background.paper" : theme === "dark" ? "transparent" : "background.paper",
    },
  });
};

const Topbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const { appState } = useAppSelector((state) => state.appState);
  const { theme } = useAppSelector((state) => state.theme);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onSwithTheme = () => {
    const themes = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(themes));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            {/* Mobile main menu */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { md: "none" } }}>
              <IconButton color="inherit" sx={{ mr: 2 }} onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>

              <Box>
                <Logo />
              </Box>
            </Stack>
            {/* Mobile main menu */}

            {/* Desktop main menu */}
            <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
                {theme === "dark" && <DarkModeOutlinedIcon />}
                {theme === "light" && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* Desktop main menu */}

            {/* user menu */}
            {!user && (
              <Stack>
                <Button variant="contained" onClick={() => dispatch(setAuthModalOpen(true))}>
                  sign in
                </Button>
              </Stack>
            )}
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
