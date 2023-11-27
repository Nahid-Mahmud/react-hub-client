import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyCommentTable = ({
  comment,
  index,
  allCommentDataRefetch,
  setcommentData,
  commentData,
  handleShowMore,
}) => {
  const axiosSecure = useAxiosSecure();
  // console.log(comment);

  const { comments, _id, email, postTitle, report } = comment;

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
  }, [comments, setcommentData]);

  const handleReoprt = () => {
    if (value === "") {
      // console.log("if block")
      toast(" Choose a report option!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // post report data to database
    const reportData = {
      report: value,
    };

    axiosSecure.put(`/comments/report/${_id}`, reportData).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Commnet Reported!",
          showConfirmButton: false,
          timer: 1500,
        });
        allCommentDataRefetch();
      }
    });

    console.log(reportData);

    setbuttonDisable(true);
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{email}</td>
        <td>
          {commentData}

          <span
            onClick={() => handleShowMore(comments)}
            className="text-blue-600 font-medium cursor-pointer"
          >
            See more...
          </span>
        </td>
        <td>
          <select
            className="btn text-black capitalize   hover:bg-white hover:text-black bg-slate-200 "
            name="usertag"
            onChange={handleOptionChange}
            id="usertag"
          >
            <option className="capitalize" value={""}>
              Select a Report
            </option>
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
    </>
  );
};

export default MyCommentTable;
