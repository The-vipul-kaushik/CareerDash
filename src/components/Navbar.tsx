import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  
  // For detecting mobile screen size
  const isMobile = useMediaQuery("(max-width:600px)");

  const [openDrawer, setOpenDrawer] = useState(false);

  // Toggle drawer
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
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
      <ListItem component={Link} to="/dashboard" onClick={toggleDrawer}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem component={Link} to="/applications" onClick={toggleDrawer}>
        <ListItemText primary="Applications" />
      </ListItem>
      <ListItem component={Link} to="/add-application" onClick={toggleDrawer}>
        <ListItemText primary="Add Application" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <img src="src/assets/logo.png" alt="CareerDash Logo" style={{ height: '30px', marginRight: '8px' }} />
          CareerDash
        </Link>
      </Typography>


        {/* Mobile Icon Button */}
        {isMobile ? (
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        ) : (
          // Desktop Links
          !isAuthPage && renderDesktopLinks()
        )}

        {/* Drawer for mobile */}
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
          {renderMobileLinks()}
        </Drawer>

        {/* Show login/register buttons if on login/register page */}
        {isAuthPage && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
