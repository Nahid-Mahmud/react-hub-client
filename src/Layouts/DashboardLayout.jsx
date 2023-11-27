import { Outlet } from "react-router-dom";
import DrawerItem from "../Shared/DrawerItem";
import { FaBars } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAdmin from "../Hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log("User Is admin?", isAdmin);
  return (
    <div>
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content p-10 flex flex-col">
            <label
              htmlFor="my-drawer-2"
              className=" drawer-button lg:hidden mb-5"
            >
              <FaBars className="text-3xl cursor-pointer" />
            </label>
            {/* Page content here */}

            <Outlet />
            <ToastContainer />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 space-y-3 text-base-content">
              {/* Sidebar content here */}
              {/* genarel user links */}
              {!isAdmin && (
                <>
                  <li>
                    <DrawerItem
                      itemName={"My Profile"}
                      pathName={"/dashboard/myprofile"}
                    />
                  </li>
                  <li>
                    <DrawerItem
                      itemName={"Add Post"}
                      pathName={"/dashboard/addpost"}
                    />
                  </li>
                  <li>
                    <DrawerItem
                      itemName={"My Posts"}
                      pathName={"/dashboard/myposts"}
                    />
                  </li>
                </>
              )}
              {/* admin routes */}
              {isAdmin && (
                <>
                  {" "}
                  <li>
                    <DrawerItem
                      itemName={"Admin Profile"}
                      pathName={"/dashboard/adminprofile"}
                    />
                  </li>
                  <li>
                    <DrawerItem
                      itemName={"Manage Users"}
                      pathName={"/dashboard/manageusers"}
                    />
                  </li>
                  <li>
                    <DrawerItem
                      itemName={"Reported Comments"}
                      pathName={"/dashboard/reportedcomments"}
                    />
                  </li>
                  <li>
                    <DrawerItem
                      itemName={"Make Announcement"}
                      pathName={"/dashboard/makeannouncement"}
                    />
                  </li>
                </>
              )}
              {/* common route */}
              <li>
                <DrawerItem itemName={"Home"} pathName={"/"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
