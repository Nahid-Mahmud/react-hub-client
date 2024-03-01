import { NavLink } from "react-router-dom";

const NavItem = ({ itemName, pathName }) => {
  return (
    <NavLink
      to={pathName}
      className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "underline font-semibold" : "")}
    >
      {itemName}
    </NavLink>
  );
};

export default NavItem;
