import { MenuItem, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const IconMenuItem = ({ pathName, itemName, handleCloseUserMenu }) => {
  return (
    <NavLink style={{textDecoration:'none'}} to={pathName}>
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography sx={{ color: "black" }} textAlign="center">
          {" "}
          {itemName}
        </Typography>
      </MenuItem>
    </NavLink>
  );
};

export default IconMenuItem;
