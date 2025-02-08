import * as React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSliceActions } from "../../store/slices/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.authentication.token);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleNavigateToProfile = () => {
    navigate("/my-profile");
    setAnchorEl(null);
  };

  const handleNavigateToPortfolio = () => {
    navigate("/my-portfolio");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authSliceActions.logout());
    navigate("/signin");
    setAnchorEl(null);
  };

  return (
    <header>
      <div id="app-name-logo" onClick={handleNavigateToDashboard}>
        <img src="/logo.png"/>
      </div>
      {token && (
        <>
          <Button
            id="hamburger-menu"
            aria-controls={open ? "hamburger-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleShowMenu}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="hamburger-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "hamburger-menu",
            }}
          >
            <MenuItem onClick={handleNavigateToProfile}>My Profile</MenuItem>
            <MenuItem onClick={handleNavigateToPortfolio}>
              Portfolio
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <div id="header-buttons">
            <button onClick={handleNavigateToProfile}>My Profile</button>
            <button onClick={handleNavigateToPortfolio}>Portfolio</button>
            <button>
              <img src=""/>
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </header>
  );
}
