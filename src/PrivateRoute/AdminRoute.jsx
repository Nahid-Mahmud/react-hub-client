
import { useAuth } from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Shared/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();
  // console.log( "is admin from useAdminroute" , isAdmin)
  if (loading || isAdminLoading) {
    return <Loader />;
  }
  if (user && isAdmin) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default AdminRoute;
