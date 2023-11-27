import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log("IS admin status", isAdmin);
  const { user, loading } = useAuth();
  const { data: usersData, refetch: userDataRefetch } = useQuery({
    queryKey: ["getAllUsers"],
    enabled: !loading && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      //   console.log(res.data);
      return res.data;
    },
  });
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
            console.log(res.data);
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
    console.log(name);
  };

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
                <th>Make Admin</th>
                <th> Subscription </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {usersData?.map((indivisualuser, index) => {
                console.log(`user no ${index + 1}`, indivisualuser);

                const { name, email: userEmail, role, badge } = indivisualuser;

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td> {name}</td>
                    <td>{userEmail}</td>
                    <td>
                      <button
                        title={role}
                        onClick={() => handleAdminButton(name)}
                        className="btn bg-blue-600 text-slate-300 hover:bg-blue-900 hover:text-white"
                      >
                        Make Admin
                      </button>
                    </td>
                    <td className="capitalize">{badge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
