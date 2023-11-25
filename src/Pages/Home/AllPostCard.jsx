const AllPostCard = ({ post }) => {
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

  const totalVotes = upVoteCount + downVoteCount;

  return (
    <div>
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
          <p>Total Comments: {commentsCount}</p>
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
