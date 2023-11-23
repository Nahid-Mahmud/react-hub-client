import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
