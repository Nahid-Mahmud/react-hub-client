import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AllPostCard from "./AllPostCard";
import Loader from "../../Shared/Loader";

const AllPosts = ({ search, setSearch }) => {
  const axiosPublic = useAxiosPublic();

  // pagination
  // getting postCount

  const [currentPage, setCurrentPage] = useState(0);
  const { data: postCountData = [], isLoading } = useQuery({
    queryKey: ["postsCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts-count");
      return res.data;
    },
  });
  const postCount = parseInt(postCountData.postsCount);
  const itemPerPage = 5;
  const numberOfpages = Math.ceil(postCount / itemPerPage);
  // console.log("Number of pages", numberOfpages);

  let pages = [];

  if (numberOfpages) {
    pages = [...Array(numberOfpages).keys()];
  }

  // pagination ends here
  const [sort, setSort] = useState(null);
  const [postsData, setPostsData] = useState([]);
  // console.log(postsData);

  const handleSortByPopularity = () => {
    setSearch(undefined);
    setSort("popularity");
  };

  useEffect(() => {
    axiosPublic
      .get(`/posts?sort=${sort}&page=${currentPage}&search=${search}`)
      .then((res) => {
        setPostsData(res.data);
      });
  }, [axiosPublic, sort, currentPage, search]);

  return (
    <div className="max-w-[90rem] pb-10 mx-auto">
      <p className="text-center font-bold text-3xl mb-10 underline">
        All Posts
      </p>
      <div onClick={handleSortByPopularity} className="text-center mb-5 ">
        <button className="btn hover:bg-blue-900 bg-blue-600 text-white">
          Sort By Popularity
        </button>
      </div>
      <div className="grid max-w-[95vw] mx-auto mb-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {postsData.map((post, index) => (
          <AllPostCard key={index} post={post} />
        ))}
      </div>
      {/* Pagination */}
      <div className="text-center space-x-2">
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
              onClick={() => setCurrentPage(pageNumber)}
              key={index}
            >
              {pageNumber +1}
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

export default AllPosts;
