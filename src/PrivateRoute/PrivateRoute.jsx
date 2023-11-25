import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Loader from "../Shared/Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader></Loader>;
  }
  if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default PrivateRoute;
