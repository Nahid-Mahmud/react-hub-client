import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import { Container } from "@mui/material";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
