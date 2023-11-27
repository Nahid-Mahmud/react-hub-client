import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useState } from "react";

const useUserIndivisualCreatedPosts = () => {
  const [userIndivisualPostData, setUserIndivisualPostData] = useState([]);
  const [userPostCount, setUserPostCount] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: userPostData, isLoading: userPostDataLoading,refetch:userPostDataRefetch } = useQuery({
    queryKey: ["userIndivisualCreatedPosts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user?.email}`);
      setUserIndivisualPostData(res?.data?.userCeatedPosts);
      setUserPostCount(res?.data?.totalPostByUser);
      return res.data;
    },
  });
  return { userIndivisualPostData, userPostCount, userPostDataLoading,userPostDataRefetch };
};

export default useUserIndivisualCreatedPosts;
