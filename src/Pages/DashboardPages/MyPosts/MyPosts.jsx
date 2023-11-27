import React from "react";
import useUserIndivisualCreatedPosts from "../../../Hooks/useUserIndivisualCreatedPosts";
import Myposttable from "./Myposttable";

const MyPosts = () => {
  const {
    userIndivisualPostData,
    userPostCount,
    userPostDataLoading,
    userPostDataRefetch,
  } = useUserIndivisualCreatedPosts();
  //   console.log(userIndivisualPostData, userPostCount);
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
                <th> Comment </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {userIndivisualPostData?.map((post, index) => (
                <Myposttable
                  userPostDataRefetch={userPostDataRefetch}
                  key={index}
                  index={index}
                  post={post}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
