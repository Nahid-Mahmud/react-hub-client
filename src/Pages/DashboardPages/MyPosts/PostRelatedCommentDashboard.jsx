import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MyCommentTable from "./MyCommentTable";

const PostRelatedCommentDashboard = () => {
  const postData = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const [commentData, setcommentData] = useState("");
  const [fullComment, setfullComment] = useState("");

  const handleShowMore = (comments) => {
    setfullComment(comments);
    document.getElementById("my_modal_5").showModal();
  };

  const { _id } = postData;

  const {
    data: allCommentsData = [],
    isLoading,
    refetch: allCommentDataRefetch,
  } = useQuery({
    queryKey: ["commentsForTable"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments`);
      return res.data;
    },
  });
  //   console.log(allCommentsData);

  const mycomments = allCommentsData.filter(
    (comment) => comment.postId === _id
  );
  console.log(mycomments);

  // console.log(postData);
  return (
    <div>
      {" "}
      <p>
        email of the commenter, the comment text, feedback, and a Report button.
        By default, the Report button will be disabled. The Feedback column will
        have a dropdown with 3 feedbacks (these will be static and totally up to
        you but make sure to keep it relevant). If a user selects a feedback
        reason, the Report button will become active. Once the Report button is
        clicked, it will be disabled.
      </p>{" "}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mycomments.map((comment, index) => {
                return (
                  <MyCommentTable
                    allCommentDataRefetch={allCommentDataRefetch}
                    comment={comment}
                    index={index}
                    key={index}
                    commentData={commentData}
                    setcommentData={setcommentData}
                    handleShowMore={handleShowMore}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Full Commnet</h3>
          <p className="py-4">{fullComment}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostRelatedCommentDashboard;
