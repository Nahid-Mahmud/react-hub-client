import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserBadge = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: isUserBadge = "",
    isPending: isUserBadgeLoading,
    refetch: badgeDataRefetch,
  } = useQuery({
    queryKey: [user?.email, "isUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log(res.data);
      return res.data?.badge;
    },
  });
  return [isUserBadge, isUserBadgeLoading, badgeDataRefetch];
};

export default useUserBadge;
