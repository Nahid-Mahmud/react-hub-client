import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useUserBadge = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const {
    data: isUserBadge = "",
    isPending: isUserBadgeLoading,
    refetch: badgeDataRefetch,
  } = useQuery({
    queryKey: [user?.email, "isUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log( "Databse User data", res.data);
      setDbUser(res.data);
      return res.data?.badge;
    },
  });
  return [isUserBadge, isUserBadgeLoading, badgeDataRefetch, dbUser];
};

export default useUserBadge;
