import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAdmin from "../../../Hooks/useAdmin";
import { useAuth } from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useStatitics from "../../../Hooks/useStatitics";
import { Helmet } from "react-helmet-async";

const ReportedComments = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { staticticsData } = useStatitics();
  // console.log(staticticsData);
  const [isAdmin, isAdminLoading] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // console.log("isAdmin form ReportedComments", isAdmin);
  const {
    data: reportedCommentsByUsers = [],
    refetch: reportedCommentsRefetch,
  } = useQuery({
    queryKey: ["get Reported Comments"],
    enabled: !loading && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/comments/status/reported?page=${currentPage}`
      );
      //   console.log(res.data);
      return res.data;
    },
  });

  const handleDeleteComment = (id) => {
    // console.log(id);
    axiosSecure.delete(`/comments/delete/${id}`).then((res) => {
      console.log(res.data);
      if (res.data?.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comment Deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        reportedCommentsRefetch();
      }
    });
  };
  const handleRejectComment = (id) => {
    // console.log(id);
    axiosSecure.put(`/comments/report/remove/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data?.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Report Rejectred!",
          showConfirmButton: false,
          timer: 1500,
        });
        reportedCommentsRefetch();
      }
    });
  };

  // pagination
  const itemPerPage = 10;
  const numberOfpages = Math.ceil(
    staticticsData?.reportedCommentsCount / itemPerPage
  );
  let pages = [];

  if (numberOfpages) {
    pages = [...Array(numberOfpages).keys()];
  }

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    reportedCommentsRefetch();
  }, [reportedCommentsRefetch, currentPage]);

  return (
    <>
      <div className="text-center text-2xl font-bold">Reported Comments</div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Post id</th>
                <th>Commented By</th>
                <th>Reported By</th>
                <th>Report Type</th>
                <th>Action</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {reportedCommentsByUsers?.map((comment, index) => {
                //
                // console.log(comment);
                const { email, _id, postId, postTitle, report, reportedBy } =
                  comment;
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{postTitle}</td>
                    <td>{postId}</td>
                    <td>{email}</td>
                    <td>{reportedBy}</td>
                    <td>{report}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleDeleteComment(_id)}
                        className="btn bg-red-600 text-white hover:bg-red-800 hover:text-white"
                      >
                        {" "}
                        Delete{" "}
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRejectComment(_id)}
                        className="btn bg-yellow-600 text-white hover:bg-yellow-800 hover:text-white"
                      >
                        {" "}
                        Reject{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-center my-10 space-x-2">
          {/* Previous button */}
          <button
            className="btn"
            onClick={() =>
              currentPage > 0
                ? setCurrentPage(currentPage - 1)
                : setCurrentPage(currentPage)
            }
          >
            Previous
          </button>
          {pages.map((pageNumber, index) => {
            return (
              <button
                className={` btn ${
                  currentPage === pageNumber ? "bg-[#ff4e59]" : ""
                } `}
                onClick={() => {
                  handleCurrentPage(pageNumber);
                }}
                key={index}
              >
                {pageNumber + 1}
              </button>
            );
          })}
          {/* Next Button */}

          <button
            onClick={() =>
              currentPage < numberOfpages - 1
                ? setCurrentPage(currentPage + 1)
                : setCurrentPage(currentPage)
            }
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
      <Helmet>
        <title>Reported Comments - ReactHub </title>
      </Helmet>
    </>
  );
};

export default ReportedComments;
