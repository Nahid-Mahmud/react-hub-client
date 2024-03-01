import NavItem from "../Shared/NavItem";
import Swal from "sweetalert2";
import { useAuth } from "../Hooks/useAuth";
import useAnnouncements from "../Hooks/useAnnouncements";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

const NavBar = () => {
  const { user, signoutUser } = useAuth();
  const [announcementsData] = useAnnouncements();

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
    <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 w-full bg-white">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="flex gap-3  items-center mr-4">
            <img
              className="md:h-12 h-8 w-auto rounded-full "
              src="https://i.ibb.co/sVkbSW9/React-Hub-Logo.png"
              alt="logo"
            />
          </div>
          <div className="flex gap-5">
            <NavItem itemName={"Home"} pathName={"/"} />
            <NavItem itemName={"Membership"} pathName={"/membership"} />
            {user && (
              <div className="flex relative">
                <MdOutlineMessage className="text-3xl" />
                <p className="badge absolute left-5 -top-1">
                  {user && announcementsData?.length > 0 ? announcementsData?.length : 0}
                </p>
              </div>
            )}

            {user ? "" : <NavItem itemName={"Join Us"} pathName={"/login"} />}
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="">
                {user ? (
                  <img className="rounded-full h-12 w-auto" src={user?.photoURL} alt="" />
                ) : (
                  <FaUserAlt className="text-3xl" title="Please Login!" />
                )}
              </div>
            </div>
            {user && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
