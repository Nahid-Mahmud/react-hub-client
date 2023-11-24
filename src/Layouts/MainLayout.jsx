import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
// import { Container } from "@mui/material";
import Footer from "../Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
