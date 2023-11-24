// import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../Hooks/useAuth";

const Home = () => {
  const { demoUser } = useAuth();
  console.log(demoUser);
  return (
    <>
      <Helmet>
        <title>Home - ReactHub </title>
      </Helmet>
      <div>Home</div>
    </>
  );
};

export default Home;
