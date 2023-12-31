import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useStatitics from "../../../Hooks/useStatitics";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { staticticsData } = useStatitics();
  // console.log(staticticsData);
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  // console.log("IS admin status", isAdmin);
  const { user, loading } = useAuth();
  const {
    data: usersData = [],
    refetch: userDataRefetch,
    isLoading: userDataLoading,
  } = useQuery({
    queryKey: ["getAllUsers"],
    enabled: !loading && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/admin/${user?.email}?page=${currentPage}`
      );
      //   console.log(res.data);
      return res.data;
    },
  });

  // paginaation

  const itemPerPage = 10;
  const numberOfpages = Math.ceil(staticticsData?.totalUsers / itemPerPage);
  let pages = [];

  if (numberOfpages) {
    pages = [...Array(numberOfpages).keys()];
  }

  //   console.log("Users data", usersData);

  // update use role
  const handleAdminButton = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Making Admin to '${name}'`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/user/updaterole/${user?.email}`, { role: "admin", name: name })
          .then((res) => {
            // console.log(res.data);
            if (res.data?.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: `${name} is now an Admin`,
                icon: "success",
              });
              userDataRefetch();
            } else {
              Swal.fire({
                title: "Oooops!",
                text: `${name} is Alrady an Admin!`,
                icon: "error",
              });
            }
          });
      }
    });
    // console.log(name);
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    userDataRefetch();
  }, [userDataRefetch, currentPage]);

  if (userDataLoading) {
    return <div className="text-center">Loading...</div>;
  }

  function handleDeleteUser(id) {
    // console.log(id)
    const userEmail = usersData?.find((user) => user._id === id)?.email;
    console.log(userEmail);

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
        axiosSecure.delete(`user/delete/${id}`).then((res) => {
          console.log(res.data);
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            userDataRefetch();
          }
        });
      }
    });
  }

  return (
    <div>
      <p className="text-center font-bold text-2xl underline mb-3">
        Manage All Users
      </p>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th> Subscription </th>
                <th>Make Admin</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {usersData?.map((indivisualuser, index) => {
                // console.log(`user no ${index + 1}`, indivisualuser);

                const { name, email: userEmail, role, badge } = indivisualuser;

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td> {name}</td>
                    <td>{userEmail}</td>

                    <td className="capitalize">{badge}</td>
                    <td>
                      {role === "admin" ? (
                        <button disabled={true} className="btn">
                          {" "}
                          Admin{" "}
                        </button>
                      ) : (
                        <button
                          title={role}
                          onClick={() => handleAdminButton(name)}
                          className="btn bg-blue-600 text-slate-300 hover:bg-blue-900 hover:text-white"
                        >
                          Make <br /> Admin
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(indivisualuser?._id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                    currentPage === pageNumber ? "bg-[#ffed4e]" : ""
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
      </div>
      <Helmet>
        <title>Manage Profiles - ReactHub </title>
      </Helmet>
    </div>
  );
};
// new functioality added
export default ManageUsers;
