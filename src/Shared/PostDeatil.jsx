import { useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { useAuth } from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useUserBadge from "../Hooks/useUserBadge";

const PostDeatil = () => {
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const postData = useLoaderData();
  // Limited comment for bronze user
  const [isUserBadge, isUserBadgeLoading] = useUserBadge();
  // console.log("comment count", commentCount);
  // const userCommentLimit = commentCount >= 5 && isUserBadge === "bronze";
  // console.log("userCommentLimit", userCommentLimit);
  const {
    _id,
    authorName,
    authorPicture,
    postTitle,
    tags,
    description,
    time,
    commentsCount,
    upVoteCount,
    downVoteCount,
  } = postData;
  // console.log(postData);

  // get user comment count

  useEffect(() => {
    axiosPublic.get(`/comments/${user?.email}`).then((res) => {
      // console.log("Total user comment =", res.data?.totalUserComments);
      return setCommentCount(res.data?.totalUserComments || 0);
    });
  }, [user?.email, axiosPublic]);

  // react share url
  const shareUrl = `${import.meta.env.VITE_CNAME}/post/${_id}`;
  //   states for upvote and downvote

  const [upvote, setUpvote] = useState(upVoteCount);
  const [downvote, setDownvote] = useState(downVoteCount);

  const upVoteDifference = upvote - upVoteCount;
  const downVoteDifference = downvote - downVoteCount;

  const handleUpvote = () => {
    if (upVoteDifference >= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can only vote once",
      });
      return;
    }
    if (downVoteDifference > 0) {
      setDownvote(downvote - 1);
    }

    setUpvote(upvote + 1);
  };
  const handleDownvote = () => {
    if (downVoteDifference >= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can only vote once",
      });
      return;
    }
    if (upVoteDifference > 0) {
      setUpvote(upvote - 1);
    }

    setDownvote(downvote + 1);
  };

  // console.log("upvode =", upvote, ",Downvte ", downvote);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if upvote or downvote is changed then only update the database
    if (upVoteDifference > 0 || downVoteDifference > 0) {
      const postVoteData = {
        upVoteCount: upvote,
        downVoteCount: downvote,
      };

      axiosSecure.put(`/posts/${_id}`, postVoteData).then((res) => {
        // console.log(res.data);
      });
    }

    const comments = e.target.comment.value;
    const postCommentData = {
      postTitle: postTitle,
      comments: comments,
      email: user?.email,
      postId: _id,
    };
    axiosSecure.post(`/comments`, postCommentData).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your Comment has been added",
        });
        navigate("/");
      }
    });
    // console.log(`submit button is working`, comments);
  };

  return (
    <div className="md:min-h-[87.7vh] min-h-[50vh] md:max-w-[95vw] max-w-[95vw] mx-auto flex flex-col py-10 items-center justify-center">
      <div className="space-y-2 shadow-lg p-5 border dark:border dark:bg-[#0b1222] rounded-md">
        <div className="flex  items-center gap-2 border p-2 rounded-md">
          <div className="avatar ">
            <div className="w-12 rounded-full">
              <img src={authorPicture} />
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold"> {authorName} </p>
            <p> {time} </p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-lg max-w-[24rem] font-medium">{postTitle}</p>
          <p className="lg:max-w-[30vw]  ">{description}</p>
          <p> # {tags} </p>
          <p className="text-sm">Click on arrows to vote this post</p>
          <div className="flex flex-col md:flex-row gap-5">
            <div onClick={handleUpvote} className="flex gap-2 items-center  ">
              Total UpVote :<span className="font-bold"> {upVoteCount} </span>
              {upVoteDifference ? `+${upVoteDifference}` : ""}
              <div>
                <FaArrowUp className="text-xl cursor-pointer" />
              </div>
            </div>
            <div className="flex gap-2 items-center  ">
              Total DownVote: <span className="font-bold"> {downVoteCount} </span>
              {downVoteDifference ? `+${downVoteDifference}` : ""}
              <div onClick={handleDownvote}>
                <FaArrowDown className="text-xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label className="text-xl font-medium"> Leave a Comment! </label>
            <textarea
              name="comment"
              disabled={user ? false : true}
              required={true}
              placeholder="Commet Here"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs dark:bg-blue-950"
            ></textarea>
          </div>
          {!user ? (
            <p className="text-xl text-red-500 my-3"> User Must Login to comment. </p>
          ) : (
            <div>
              <input
                type="submit"
                value="Post Comment"
                className="btn btn-xs sm:btn-sm md:btn-md mt-5 bg-blue-600 text-white h-[3rem] hover:bg-blue-800 hover:text-white lg:btn-lg"
              />
            </div>
          )}
        </form>
        <div className=" flex flex-col shadow-md dark:bg-blue-950 rounded-md w-fit md:mx-auto p-5  items-center">
          <FacebookShareButton url={shareUrl} hashtag={`#${tags}`}>
            <FacebookIcon size={42} round={true} />
          </FacebookShareButton>
          <p> Share To Facebook </p>
        </div>
      </div>
    </div>
  );
};

export default PostDeatil;
