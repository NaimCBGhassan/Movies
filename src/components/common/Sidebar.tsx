import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import Logo from "./Logo";
import { uiConfigs } from "../../configs/ui.config";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { setTheme } from "../../store/slice/themeModeSlice";

type Props = {
  open?: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ open, toggleSidebar }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { appState } = useAppSelector((state) => state.appState);
  const { theme } = useAppSelector((state) => state.theme);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const themes = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(themes));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state) ? "primary.main" : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar()}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography textTransform="uppercase">{item.display}</Typography>}
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state) ? "primary.main" : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar()}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography textTransform="uppercase">{item.display}</Typography>}
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {theme === "dark" && <DarkModeOutlinedIcon />}
            {theme === "light" && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography textTransform="uppercase">{theme === "dark" ? "dark mode" : "light mode"}</Typography>}
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar()}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
