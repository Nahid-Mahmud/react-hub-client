import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllPosts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: postsData = [],
    isLoading: isPostDataLoading,
    refetch: postRefetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts");
      return res.data;
    },
  });

  const { data: postCountData = {} } = useQuery({
    queryKey: ["postsCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts-count");
      return res.data;
    },
  });
  console.log(postCountData.postsCount);

  return <div>total posts: {postsData.length}</div>;
};

export default AllPosts;
