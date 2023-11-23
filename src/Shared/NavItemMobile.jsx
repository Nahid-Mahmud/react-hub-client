import { MenuItem, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavItemMobile = ({ itemName, pathName, handleCloseNavMenu }) => {
  return (
    <NavLink to={pathName}>
      <MenuItem onClick={handleCloseNavMenu}>
        <Typography sx={{color: "black"}} textAlign="center"> {itemName} </Typography>
      </MenuItem>
    </NavLink>
  );
};

export default NavItemMobile;
