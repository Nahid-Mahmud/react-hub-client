import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// eslint-disable-next-line react/prop-types
const Banner = ({ handleSearch, setSearch }) => {
  const axiosPublic = useAxiosPublic();

  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tags");
      return res.data;
    },
  });

  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage: "url(https://i.ibb.co/MpcC28x/banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">
            Inspiring Reactivity,
            <br />
            Inspiring You.
          </h1>
          <p className="mb-5">
            Welcome to ReactHub, where conversations come to life! Engage with
            like-minded individuals, share ideas, and explore the vibrant world
            of React development. Join our community and stay at the forefront
            of React technologies. Let's code, discuss, and grow together at
            ReactHub – your central hub for all things React!
          </p>
          <div className="flex items-center justify-center">
            <input
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              type="text"
              placeholder="Type here"
              className="input rounded-r-none text-black  w-full max-w-xs"
            />
            <button
              onClick={handleSearch}
              className="md:p-[0.75rem] min-h-[3rem] bg-blue-600 rounded-r-lg "
            >
              Search
            </button>
          </div>
          <div>
            Popular tags :{" "}
            {tagsLoading ? (
              ""
            ) : (
              <span>
                {" "}
                {tags.map((tag, index) => (
                  <span
                    onClick={() => setSearch(tag.tag)}
                    className="text-xl cursor-pointer"
                    key={index}
                  >
                    {" "}
                    #<span>{tag?.tag}</span>{" "}
                  </span>
                ))}{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
