import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import NavItem from "./NavItem";
import NavItemMobile from "./NavItemMobile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconMenuItem from "./IconMenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import SearchBox from "../Components/SearchBox/SearchBox";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // search bar state management

  const [search, setSearch] = React.useState("");

  // navbar menu state management

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // user menu state management

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = () => {
    console.log(search);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <img
              style={{
                height: "3rem",
                borderRadius: "50%",
                marginRight: ".5rem",
              }}
              src="https://i.ibb.co/sVkbSW9/React-Hub-Logo.png"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ReactHub
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                {/* 
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"> Home </Typography>
                </MenuItem> */}
                <NavItemMobile
                  itemName={"Home"}
                  pathName={"/"}
                  handleCloseNavMenu={handleCloseNavMenu}
                />

                <NavItemMobile
                  itemName={"Membership"}
                  pathName={"/membership"}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
                <NavItemMobile
                  itemName={"Join Us"}
                  pathName={"/login"}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ReactHub
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* // pages for big device */}

              <NavItem
                itemName={"Home"}
                pathName={"/"}
                handleCloseNavMenu={handleCloseNavMenu}
              />

              <NavItem
                itemName={"Membership"}
                pathName={"/membership"}
                handleCloseNavMenu={handleCloseNavMenu}
              />
              {/* Hide on User Available */}

              <NavItem
                itemName={"Join Us"}
                pathName={"/login"}
                handleCloseNavMenu={handleCloseNavMenu}
              />

              <SearchBox />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* have to replace with user icon */}
                  <AccountCircleIcon
                    style={{ fontSize: "3rem", color: "black" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}

                <MenuItem>
                  <Typography textAlign="center"> UserName </Typography>
                </MenuItem>
                <IconMenuItem
                  itemName={"Dashboard"}
                  pathName={"/dashboard"}
                  handleCloseUserMenu={handleCloseUserMenu}
                />
                {/*  Onclik logout and display when user available */}
                <MenuItem>
                  <Button sx={{ color: "black" }}>LogOut</Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
