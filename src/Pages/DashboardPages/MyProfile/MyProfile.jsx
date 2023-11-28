import React, { useState } from "react";
import useUserBadge from "../../../Hooks/useUserBadge";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserIndivisualCreatedPosts from "../../../Hooks/useUserIndivisualCreatedPosts";
import AllPostCard from "../../Home/AllPostCard";
import RecentPostCards from "./RecentPostCards";

const MyProfile = () => {
  const {
    userIndivisualPostData,
    userPostCount,
    userPostDataLoading,
    userPostDataRefetch,
  } = useUserIndivisualCreatedPosts();
  const { user, loading } = useAuth();
  const [isUserBadge, isUserBadgeLoading, badgeDataRefetch] = useUserBadge();

  //   console.log("Firebase USer", user, userIndivisualPostData);
  const recentUserPost = userIndivisualPostData?.slice(0, 3);
  //   console.log("recent 3 post", recentUserPost);

  console.log(isUserBadge);
  return (
    <div>
      <div className=" lg:max-w-[30vw] mx-auto mb-10  md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <div className="space-y-2 shadow-lg  p-5 ">
            <div className="flex justify-between">
              <div className="flex  items-center gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold"> {user?.displayName} </p>
                </div>
              </div>
              {isUserBadge === "bronze" && (
                <div className="flex flex-col space-y-3  items-center">
                  <label>
                    Badge:{" "}
                    <span className="font-semibold capitalize">
                      {isUserBadge}
                    </span>
                  </label>{" "}
                  <img
                    className="rounded-full  w-16"
                    src="https://i.ibb.co/KsfR4tC/bronze-Badge.png"
                    alt=""
                  />
                </div>
              )}
              {isUserBadge === "gold" && (
                <div className="flex flex-col space-y-3  items-center">
                  <label>
                    Badge:{" "}
                    <span className="font-semibold capitalize">
                      {isUserBadge}
                    </span>{" "}
                  </label>{" "}
                  <img
                    className="rounded-full  w-16"
                    src="https://i.ibb.co/m01jfZ6/gold-Badge.png"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-lg max-w-[24rem] font-medium">
                {/* {item?.title} */} Email: {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      {recentUserPost.length > 0 ? (
        <p className="text-2xl font-bold underline text-center">Recent Posts</p>
      ) : (
        <p className="text-2xl font-bold underline text-center">
          {" "}
          No Recent Posts Found
        </p>
      )}

      <div>
        <div className="grid max-w-[95vw] mx-auto mb-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentUserPost.map((post, index) => (
            <RecentPostCards key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

// https://i.ibb.co/m01jfZ6/gold-Badge.png
// https://i.ibb.co/KsfR4tC/bronze-Badge.png
