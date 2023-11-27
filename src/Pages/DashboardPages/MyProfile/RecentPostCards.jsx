import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const RecentPostCards = ({ post }) => {
  const axiosPublic = useAxiosPublic();
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
  } = post;

  const { data: allCommentsData = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments`);
      return res.data;
    },
  });
  //   console.log(allCommentsData);

  const totalComments = allCommentsData.filter(
    (comment) => comment.postId === _id
  );
  //   console.log(totalComments);

  // const totalVotes = upVoteCount + downVoteCount;

  return (
    <div className="cursor-pointer">
      <div className="space-y-2 shadow-lg  p-5 ">
        <div className="flex  items-center gap-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={authorPicture} />
            </div>
          </div>
          <p className="text-xl font-semibold"> {authorName} </p>
        </div>
        <div className="space-y-3">
          <p className="text-lg max-w-[24rem] font-medium">{postTitle}</p>
          <p>#{tags}</p>
          <p> Publish Date : {time} </p>
          <p>
            Total Comments: {totalComments?.length ? totalComments.length : 0}
          </p>
          <div>
            <p> Total UpVote :{upVoteCount} </p>
            <p> Total DownVote {downVoteCount} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPostCards;
