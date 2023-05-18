import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import { setUser } from "../../store/slice/userSlice";

const UserMenu = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLHeadingElement | null>(null);

  const toggleMenu = (e: MouseEvent<HTMLHeadingElement>) => setAnchorEl(e.currentTarget);

  return (
    <>
      <>
        <Typography variant="h6" sx={{ cursor: "pointer", userSelect: "none" }} onClick={toggleMenu}>
          {user?.user.displayName}
        </Typography>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { padding: 0 } }}
        >
          {menuConfigs.user.map((item, index) => (
            <ListItemButton component={Link} to={item.path} key={index} onClick={() => setAnchorEl(null)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography textTransform="uppercase">{item.display}</Typography>}
              />
            </ListItemButton>
          ))}
          <ListItemButton sx={{ borderRadius: "10px" }} onClick={() => dispatch(setUser(null))}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText disableTypography primary={<Typography textTransform="uppercase">sign out</Typography>} />
          </ListItemButton>
        </Menu>
      </>
    </>
  );
};

export default UserMenu;
