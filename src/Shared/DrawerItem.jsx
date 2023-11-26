import React from 'react';
import { NavLink } from 'react-router-dom';

const DrawerItem = ({pathName,itemName}) => {
    return (
        <NavLink
          to={pathName}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "border-b-2 border-orange-300 bg-white font-semibold text-orange-300" : ""
          }
        >
          {itemName}
        </NavLink>
      );
};

export default DrawerItem;