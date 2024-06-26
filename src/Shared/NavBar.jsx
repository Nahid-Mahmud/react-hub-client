import NavItem from "../Shared/NavItem";
import Swal from "sweetalert2";
import { useAuth } from "../Hooks/useAuth";
import useAnnouncements from "../Hooks/useAnnouncements";
import { FaMoon, FaUserAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useEffect, useState } from "react";
import { getThemeFromLocalStoragae } from "../Hooks/getThemeFromLocalStorage";
import { FaSun } from "react-icons/fa";

const NavBar = () => {
  const { user, signoutUser } = useAuth();
  const [announcementsData] = useAnnouncements();
  const themeData = getThemeFromLocalStoragae();
  const [isDarkMode, setIsDarkMode] = useState(themeData);

  const themeSwitcher = () => {
    setIsDarkMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // useEffect to dom manupulation

  useEffect(() => {
    if (isDarkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("_theme", isDarkMode);
  }, [isDarkMode]);
  // logout function
  const handleLogout = () => {
    // console.log("logout");
    signoutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Logout Success!",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("signout user successfully");
      })
      .catch((err) => {
        // console.log("signout user error", err.message);
      });
  };
  return (
    <div className="bg-opacity-50 backdrop-filter z-50 backdrop-blur-lg fixed top-0 w-full bg-white dark:bg-[#0b1222] dark:text-white drop-shadow-md ">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="flex gap-3  items-center mr-4">
            <Link to={"/"}>
              <img
                className="md:h-12 h-8 w-auto rounded-full "
                src="https://i.ibb.co/sVkbSW9/React-Hub-Logo.png"
                alt="logo"
              />
            </Link>
            <Link to={"/"}>
              <p className="text-2xl font-semibold hidden md:inline-block">ReactHub</p>
            </Link>
          </div>
          <div className="flex gap-2 md:gap-5">
            {user && (
              <div className="flex relative">
                <MdOutlineMessage className="text-3xl" />
                <p className="badge absolute left-5 -top-1">
                  {user && announcementsData?.length > 0 ? announcementsData?.length : 0}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-none gap-4">
          <NavItem itemName={"Home"} pathName={"/"} />
          {user ? "" : <NavItem itemName={"Sign In"} pathName={"/login"} />}
          {user && <NavItem itemName={"Membership"} pathName={"/membership"} />}
          {/* <ToggleButton /> */}
          {isDarkMode === "dark" ? (
            <FaSun onClick={themeSwitcher} className="text-3xl cursor-pointer" />
          ) : (
            <FaMoon onClick={themeSwitcher} className="text-2xl cursor-pointer" />
          )}

          {/* toggle button ends */}

          <div className="dropdown dropdown-end">
            {user && (
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="">
                  {user && <img className="rounded-full h-12 w-auto" src={user?.photoURL} alt="" />}
                </div>
              </div>
            )}
            {user && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:bg-blue-950 dark:text-white"
              >
                <li>
                  <p className="">{user?.displayName}</p>
                </li>
                <li>
                  <NavItem itemName={"Dashboard"} pathName={"/dashboard"} />
                </li>
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
