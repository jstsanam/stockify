import * as React from "react";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const notLoggedIn =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header>
      <div id="app-name-logo" onClick={handleNavigateToDashboard}>
        <img src="/logo.png" alt="logo" />
      </div>
      {!notLoggedIn && (
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
              My Portfolio
            </MenuItem>
          </Menu>
          <div id="header-buttons">
            <button onClick={handleNavigateToProfile}>My Profile</button>
            <button onClick={handleNavigateToPortfolio}>My Portfolio</button>
          </div>
        </>
      )}
    </header>
  );
}
