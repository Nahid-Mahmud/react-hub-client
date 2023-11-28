import React, { useEffect, useState } from "react";
import useUserIndivisualCreatedPosts from "../../../Hooks/useUserIndivisualCreatedPosts";
import Myposttable from "./Myposttable";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useStatitics from "../../../Hooks/useStatitics";

const MyPosts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const { staticticsData } = useStatitics();
  console.log(staticticsData);

  const { data = [], refetch } = useQuery({
    queryKey: ["indPost"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/user/table/${user?.email}?page=${currentPage}`
      );
      // console.log(res.data.userCeatedPosts);
      return res.data;
    },
  });
  // console.log(data.userCeatedPosts);
  const itemPerPage = 10;
  const numberOfpages = Math.ceil(
    staticticsData?.totalPostByUser / itemPerPage
  );
  let pages = [];
  if (numberOfpages) {
    pages = [...Array(numberOfpages).keys()];
  }

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  return (
    <div>
      <p className="text-center text-xl font-semibold underline mb-5">
        All Posts
      </p>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Up Votes</th>
                <th>Down Votes</th>
                <th> Comments </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {data?.userCeatedPosts?.map((post, index) => (
                <Myposttable
                  userPostDataRefetch={refetch}
                  key={index}
                  index={index}
                  post={post}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center my-10 space-x-2">
        {/* Previous button */}
        <button
          className="btn"
          onClick={() =>
            currentPage > 0
              ? setCurrentPage(currentPage - 1)
              : setCurrentPage(currentPage)
          }
        >
          Previous
        </button>
        {pages.map((pageNumber, index) => {
          return (
            <button
              className={` btn ${
                currentPage === pageNumber ? "bg-[#ff4e59]" : ""
              } `}
              onClick={() => {
                handleCurrentPage(pageNumber);
              }}
              key={index}
            >
              {pageNumber + 1}
            </button>
          );
        })}
        {/* Next Button */}

        <button
          onClick={() =>
            currentPage < numberOfpages - 1
              ? setCurrentPage(currentPage + 1)
              : setCurrentPage(currentPage)
          }
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
