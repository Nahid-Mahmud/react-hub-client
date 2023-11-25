import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Navigate, useNavigate } from "react-router-dom";

const AllPostCard = ({ post }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
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
    (comment) => comment.postTitle === postTitle
  );
  //   console.log(totalComments);

  // const totalVotes = upVoteCount + downVoteCount;
  const handlePostClick = () => {
    navigate(`/post/${_id}`);
  };

  return (
    <div onClick={handlePostClick} className="cursor-pointer">
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

export default AllPostCard;
