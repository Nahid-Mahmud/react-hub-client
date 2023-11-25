import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AllPostCard from "./AllPostCard";

const AllPosts = () => {
  const axiosPublic = useAxiosPublic();

  const [sort, setSort] = useState(null);
  const [postsData, setPostsData] = useState([]);
  console.log(postsData);

  const handleSortByPopularity = () => {
    setSort("popularity");
  };

  useEffect(() => {
    axiosPublic.get(`/posts?sort=${sort}`).then((res) => {
      setPostsData(res.data);
    });
  }, [axiosPublic, sort]);

  const { data: postCountData = {} } = useQuery({
    queryKey: ["postsCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts-count");
      return res.data;
    },
  });
  // console.log(postCountData.postsCount);

  console.log(postsData);

  return (
    <div className="max-w-[90rem] pb-10 mx-auto">
      <p className="text-center font-bold text-3xl mb-10 underline">
        All Posts
      </p>
      <div className="text-center mb-5 ">
        <button
          onClick={handleSortByPopularity}
          className="btn hover:bg-blue-900 bg-blue-600 text-white"
        >
          Sort By Popularity
        </button>
      </div>
      <div className="grid max-w-[95vw] mx-auto mb-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {postsData.map((post, index) => (
          <AllPostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
