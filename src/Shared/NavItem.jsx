import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavItem = ({ itemName, pathName, handleCloseNavMenu }) => {
  return (
    <NavLink style={{textDecoration:'none'}} to={pathName}>
      <Button
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {itemName}
      </Button>
    </NavLink>
  );
};

export default NavItem;
