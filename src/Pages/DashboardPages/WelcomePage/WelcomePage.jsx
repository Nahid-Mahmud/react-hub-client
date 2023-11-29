import React from "react";
import useAdmin from "../../../Hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const WelcomePage = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div className=" bg-gradient-to-r text-white flex flex-col items-center justify-center from-cyan-500 min-h-[90vh] p-5 to-blue-500">
      <p className="text-3xl font-semibold">Welcome to ReactHub.</p>
      {isAdmin && (
        <p>
          Manage Users, Take Actions on reported comments and many more....{" "}
        </p>
      )}
      {!isAdmin && <p>See your profile, add post and many more.... </p>}
      <Helmet>
        <title>Welcome - ReactHub </title>
      </Helmet>
    </div>
  );
};

export default WelcomePage;
