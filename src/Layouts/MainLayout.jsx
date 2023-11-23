import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
