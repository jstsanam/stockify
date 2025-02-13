import * as React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSliceActions } from "../../store/slices/authSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logout } from "@mui/icons-material";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.authentication.token);
  const userProfile = useAppSelector((state: any) => state.userProfile.profile);

  const [hamburgerMenu, setHamburgerMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);

  const openHamburgerMenu = Boolean(hamburgerMenu);
  const openUserMenu = Boolean(userMenu);

  const handleShowHamburgerMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHamburgerMenu(e.currentTarget);
  };

  const handleCloseHamburgerMenu = () => {
    setHamburgerMenu(null);
  };

  const handleShowUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenu(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleNavigateToProfile = () => {
    setHamburgerMenu(null);
    setUserMenu(null);
    navigate("/my-profile");
  };

  const handleNavigateToPortfolio = () => {
    setHamburgerMenu(null);
    navigate("/my-portfolio");
  };

  const handleLogout = () => {
    setHamburgerMenu(null);
    setUserMenu(null);
    dispatch(authSliceActions.logout());
    navigate("/signin");
  };

  return (
    <header>
      <div id="app-name-logo" onClick={handleNavigateToDashboard}>
        <img src="/logo.png" />
      </div>
      {token && (
        <>
          <Button
            id="hamburger-menu"
            aria-controls={openHamburgerMenu ? "hamburger-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openHamburgerMenu ? "true" : undefined}
            onClick={handleShowHamburgerMenu}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="hamburger-menu"
            anchorEl={hamburgerMenu}
            open={openHamburgerMenu}
            onClose={handleCloseHamburgerMenu}
            MenuListProps={{
              "aria-labelledby": "hamburger-menu",
            }}
          >
            <MenuItem onClick={handleNavigateToProfile}>My Profile</MenuItem>
            <MenuItem onClick={handleNavigateToPortfolio}>Portfolio</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <div className="header-buttons">
            <button
              onClick={handleNavigateToPortfolio}
              className="all-transactions-button"
            >
              All Transactions
            </button>
            <Button
              id="user-menu"
              className="user-dropdown-menu"
              color="secondary"
              aria-controls={openUserMenu ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openUserMenu ? "true" : undefined}
              onClick={handleShowUserMenu}
            >
              <img src={`/assets/${userProfile?.gender}.png`} className="user-profile-image" />
            </Button>
            <Menu
              id="user-menu"
              anchorEl={userMenu}
              open={openUserMenu}
              onClose={handleCloseUserMenu}
              MenuListProps={{
                "aria-labelledby": "user-menu",
              }}
            >
              <MenuItem onClick={handleNavigateToProfile}>
                <AccountCircleIcon fontSize="small" style={{marginRight: "0.5rem"}}/>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout fontSize="small" style={{marginRight: "0.5rem"}}/>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </>
      )}
    </header>
  );
}
