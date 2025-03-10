import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const isMobile = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const token = localStorage.getItem("token"); // Check if logged in

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setOpenDrawer(false);
  };

  const renderDesktopLinks = () => (
    <>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/applications">
        Applications
      </Button>
      <Button color="inherit" component={Link} to="/add-application">
        Add Application
      </Button>
    </>
  );

  const renderMobileLinks = () => (
    <List>
      {token ? (
        <>
          <ListItem component={Link} to="/dashboard" onClick={toggleDrawer}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/applications" onClick={toggleDrawer}>
            <ListItemText primary="Applications" />
          </ListItem>
          <ListItem
            component={Link}
            to="/add-application"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Add Application" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem component={Link} to="/login" onClick={toggleDrawer}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem component={Link} to="/register" onClick={toggleDrawer}>
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2563EB" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="CareerDash Logo"
              style={{ height: "30px", marginRight: "8px" }}
            />
            CareerDash
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
              {renderMobileLinks()}
            </Drawer>
          </>
        ) : (
          !isAuthPage && (
            <>
              {renderDesktopLinks()}
              {token ? (
                <>
                  <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                  >
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
