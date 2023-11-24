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
// import SearchIcon from "@mui/icons-material/Search";
// import { Grid } from "@mui/material";
// import SearchBox from "../Components/SearchBox/SearchBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../Hooks/useAuth";
import { Badge } from "@mui/material";
// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
import MailIcon from "@mui/icons-material/Mail";
import useAnnouncements from "../Hooks/useAnnouncements";

const NavBar = () => {
  const { user, signoutUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [announcementsData, isAnnounceMentLoading, announcementRefetch] =
    useAnnouncements();

  // search bar state management
  // const [search, setSearch] = useState("");
  // const handleSearch = () => {
  //   console.log(search.label);
  // };

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

  // logout function
  const handleLogout = () => {
    console.log("logout");
    signoutUser()
      .then(() => {
        console.log("signout user successfully");
      })
      .catch((err) => {
        console.log("signout user error", err.message);
      });
  };

  // console.log(new Date().toLocaleDateString());

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
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h6"
                noWrap
                // component="a" // this is for link
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
            </Link>

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

                {user ? (
                  ""
                ) : (
                  <NavItemMobile
                    itemName={"Join Us"}
                    pathName={"/login"}
                    handleCloseNavMenu={handleCloseNavMenu}
                  />
                )}

                {/* <SearchBox handleSearch={handleSearch} setSearch={setSearch} /> */}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
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

              {/* Icon Here */}
              {/* Badge count will be dinamic  */}
              <Button>
                <Badge
                  badgeContent={
                    announcementsData?.length > 0
                      ? announcementsData?.length
                      : 0
                  }
                  color="primary"
                >
                  <MailIcon sx={{ color: "white" }} color="action" />
                </Badge>
              </Button>

              {/* Hide on User Available */}
              {user ? (
                ""
              ) : (
                <NavItem
                  itemName={"Join Us"}
                  pathName={"/login"}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              )}

              {/* Search Box */}

              {/* <SearchBox handleSearch={handleSearch} setSearch={setSearch} /> */}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title={user ? "Open settings" : "Login To Open Settings"}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* have to replace with user icon */}
                  {user ? (
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "3rem",
                        width: "3rem",
                      }}
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{ fontSize: "3rem", color: "black" }}
                    />
                  )}
                </IconButton>
              </Tooltip>

              {user ? (
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

                  {user ? (
                    <MenuItem>
                      <Typography textAlign="center">
                        {user?.displayName}
                      </Typography>
                    </MenuItem>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <IconMenuItem
                      itemName={"Dashboard"}
                      pathName={"/dashboard"}
                      handleCloseUserMenu={handleCloseUserMenu}
                    />
                  ) : (
                    ""
                  )}

                  {/*  Onclik logout and display when user available */}
                  {user ? (
                    <MenuItem>
                      <Button
                        style={{ backgroundColor: "#1976d2" }}
                        onClick={handleLogout}
                        sx={{ color: "white" }}
                      >
                        LogOut
                      </Button>
                    </MenuItem>
                  ) : (
                    ""
                  )}
                </Menu>
              ) : (
                ""
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
