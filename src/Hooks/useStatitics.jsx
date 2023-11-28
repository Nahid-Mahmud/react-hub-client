import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAdmin from "./useAdmin";
import { useAuth } from "./useAuth";

const useStatitics = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: staticticsData } = useQuery({
    queryKey: ["statisticsDataForAll"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/statistics?email=${user?.email}`);
    //   console.log(res.data);
      return res.data;
    },
  });
  return { staticticsData };
};

export default useStatitics;
