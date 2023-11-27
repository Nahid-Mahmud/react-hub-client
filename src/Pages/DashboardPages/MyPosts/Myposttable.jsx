import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Myposttable = ({ post, index, userPostDataRefetch }) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  //   console.log(post);

  const { _id, postTitle, downVoteCount, upVoteCount } = post;

  //   const { data: allCommentsData = [], isLoading } = useQuery({
  //     queryKey: ["commentsForTable"],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get(`/comments`);
  //       return res.data;
  //     },
  //   });
  //   //   console.log(allCommentsData);

  //   const totalComments = allCommentsData.filter(
  //     (comment) => comment.postId === _id
  //   );

  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/post/delete/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            userPostDataRefetch();
          }
        });
      }
    });
  };

  // Comment button functionality
  const handleCommentButton = () => {
    navigate(`/dashboard/post/dashboard/${_id}`);
  };

  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{postTitle}</td>
      <td>{upVoteCount}</td>
      <td>{downVoteCount}</td>
      <td>
        <button
          onClick={handleCommentButton}
          className="btn bg-blue-600 text-white hover:bg-blue-800 "
        >
          {" "}
          Comment{" "}
        </button>{" "}
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn bg-red-600 text-white hover:bg-red-800 "
        >
          {" "}
          Delete{" "}
        </button>{" "}
      </td>
    </tr>
  );
};

export default Myposttable;
