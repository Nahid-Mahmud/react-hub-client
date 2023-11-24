import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import { Container } from "@mui/material";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
