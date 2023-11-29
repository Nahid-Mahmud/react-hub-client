import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserIndivisualCreatedPosts from "../../../Hooks/useUserIndivisualCreatedPosts";
import useUserBadge from "../../../Hooks/useUserBadge";
import { Helmet } from "react-helmet-async";

const AddPosts = () => {
  // axios instance
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // get user data
  const {
    userIndivisualPostData,
    userPostCount,
    userPostDataLoading,
    userPostDataRefetch,
  } = useUserIndivisualCreatedPosts();
  // get usre badge Data

  const [isUserBadge, isUserBadgeLoading, badgeDataRefetch] = useUserBadge();

  const userPostLimit = userPostCount >= 5 && isUserBadge === "bronze";
  // console.log(userPostLimit, userPostCount,userIndivisualPostData);

  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tagsInAddPost"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tags");
      return res.data;
    },
  });
  // get user
  const { user } = useAuth();
  // option value
  const [value, setvalue] = useState("reactjs");
  const handleOptionChange = (e) => {
    setvalue(e.target.value);
  };

  //   console.log(tags[0].tag);

  // checking for user badge

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    //  authorName ,email ,authorPicture,postTitle,tags,description,time,commentsCount,upVoteCount,downVoteCount
    const authorName = user?.displayName;
    const email = user?.email;
    const authorPicture = user?.photoURL;
    const postTitle = e.target.title.value;
    const tags = value;
    const description = e.target.description.value;
    const time = new Date().toLocaleDateString();
    const upVoteCount = 0;
    const downVoteCount = 0;

    const postInfo = {
      authorName,
      email,
      authorPicture,
      postTitle,
      tags,
      description,
      time,
      upVoteCount,
      downVoteCount,
    };
    console.log(postInfo);

    axiosSecure.post("/posts", postInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your post has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        userPostDataRefetch();
      }
    });

    // console.log(value);
  };

  return (
    <div className="md:max-w-[90vw] max-w-[95vw] py-10 ">
      {/* // forms */}
      <div className="py-10 shadow-lg overflow-hidden">
        <div className="  rounded from-[#113a31]  max-w-7xl mx-auto ">
          <div className="bg-white bg-opacity-50  rounded px-8 pt-6 pb-8 mb-4">
            {/* Heading */}
            <h2 className="capitalize mb-10 text-center  text-2xl md:text-3xl font-bold underline">
              Create a post
            </h2>
            <form onSubmit={handleSubmitAssignment} className="pb-6">
              <div className="flex justify-between">
                <div className="flex my-2 items-center gap-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">
                      {" "}
                      {user?.displayName}{" "}
                    </p>
                    <p>Email: {user?.email} </p>
                  </div>
                </div>
                <div className="font-semibold">
                  Date:{" "}
                  <span className="font-normal">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Post Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="title"
                    required
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Post Description
                </label>
                <textarea
                  id="message"
                  name="description"
                  required
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Post Description "
                ></textarea>
              </div>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="pb-10  ">
                  <label className="block mb-2 text-sm font-medium f text-gray-900 ">
                    {" "}
                    Select A Tag Accordingly.
                  </label>
                  {tagsLoading ? (
                    "Tags Loading..."
                  ) : (
                    <select
                      className="btn text-black capitalize   hover:bg-white hover:text-black bg-slate-200 "
                      name="usertag"
                      onChange={handleOptionChange}
                      id="usertag"
                    >
                      {tags.map((tag, index) => (
                        <option
                          className="capitalize"
                          key={index}
                          value={tag.tag}
                        >
                          {tag.tag}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between">
                {userPostLimit ? (
                  <p className="">
                    {" "}
                    Bronze user can create post upto 5! Become a member to
                    create unlimited posts and comments!{" "}
                  </p>
                ) : (
                  <input
                    className="btn bg-green-600 text-white hover:text-black hover:bg-green-500 transition"
                    type="submit"
                    value="Submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Helmet>
        <title>Add Post - ReactHub </title>
      </Helmet>
    </div>
  );
};

export default AddPosts;
