import React, { useEffect, useState } from "react";

const MyCommentTable = ({ comment, index }) => {
  // console.log(comment);

  const [commentData, setcommentData] = useState("");

  const { comments, _id, email, postTitle } = comment;

  const [buttonDisable, setbuttonDisable] = useState(true);
  const [value, setvalue] = useState("    Irrelavent");
  const handleOptionChange = (e) => {
    setvalue(e.target.value);
    setbuttonDisable(false);
  };
  // console.log(value);
  useEffect(() => {
    const slisedComment = comments.slice(0, 20);
    setcommentData(slisedComment);
  }, [comments]);

  const handleReoprt = () => {
    setbuttonDisable(true);
  };
  const handleShowMore = () => {
    setcommentData(comments);
  };
  const handleShowLess = () => {
    setcommentData(comments.slice(0, 20));
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        {commentData}{" "}
        {commentData === comments ? (
          <span
            onClick={handleShowLess}
            className="text-blue-600 font-medium cursor-pointer"
          >
            See Less...
          </span>
        ) : (
          <span
            onClick={handleShowMore}
            className="text-blue-600 font-medium cursor-pointer"
          >
            See more...
          </span>
        )}
      </td>
      <td>
        <select
          className="btn text-black capitalize   hover:bg-white hover:text-black bg-slate-200 "
          name="usertag"
          onChange={handleOptionChange}
          id="usertag"
        >
          <option className="capitalize" value={"Irrelavent"}>
            Irrelavent
          </option>
          <option className="capitalize" value={"Violance"}>
            Violance
          </option>
          <option className="capitalize" value={"Hate Speech"}>
            Hate Speech
          </option>
        </select>
      </td>
      <td>
        <button
          onClick={handleReoprt}
          disabled={buttonDisable}
          className="btn btn-outline bg-yellow-500"
        >
          {" "}
          Report
        </button>
      </td>
    </tr>
  );
};

export default MyCommentTable;
