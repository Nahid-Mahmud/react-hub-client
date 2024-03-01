import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../Shared/NavBar";
// import { Container } from "@mui/material";
import Footer from "../Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Shared/Loader";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-170.5px)] mt-[66px]">
        {navigation.state === "loading" ? <Loader /> : <Outlet />}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
