import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../../Hooks/useAdmin";
import { useAuth } from "../../../Hooks/useAuth";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import PieChartAdmin from "./PieChartAdmin";
import AddTagsAdmin from "./AddTagsAdmin";
import { Helmet } from "react-helmet-async";

const AdminProfile = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  //   console.log(user);
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["statistics"],
    enabled: !loading && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get(`/statistics`);
      //   console.log(res.data);
      return res.data;
    },
  });
  //   console.log(data);
  const totalPosts = data?.totalPosts;
  const totalComments = data?.totalComments;
  const totalUsers = data?.totalUsers;
  //   console.log(totalPosts, totalComments, totalUsers);

  return (
    <>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            textUnderlineOffset: "0.2em",
            textDecoration: "underline",
          }}
          variant="h3"
          gutterBottom
        >
          Welcome {user?.displayName}!
        </Typography>

        <Box p={1} sx={{ maxWidth: "sm" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <Box>
              <img
                style={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
                src={user?.photoURL}
                alt=""
              />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "600" }} gutterBottom>
                {user?.displayName}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Email: {user?.email}
              </Typography>
            </Box>
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              sx={{
                boxShadow: 2,
                margin: "1rem",
                padding: "1rem",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "1rem",
              }}
              sm={2}
            >
              Total Posts : {totalPosts}
            </Grid>
            <Grid
              item
              sx={{
                boxShadow: 2,
                margin: "1rem",
                padding: "1rem",
                background: "#1976d2",
                color: "white",
                borderRadius: "1rem",
              }}
              sm={2}
            >
              Total Comments : {totalComments}
            </Grid>
            <Grid
              item
              sx={{
                boxShadow: 2,
                margin: "1rem",
                padding: "1rem",
                background: "#1976d2",
                color: "white",
                borderRadius: "1rem",
              }}
              sm={2}
            >
              Total Users : {totalUsers}
            </Grid>
          </Grid>
        </Box>
        <PieChartAdmin
          totalPosts={totalPosts}
          totalComments={totalComments}
          totalUsers={totalUsers}
        />
      </Box>
      <AddTagsAdmin />
      <Helmet>
        <title>Admin Profile - ReactHub </title>
      </Helmet>
    </>
  );
};

export default AdminProfile;
