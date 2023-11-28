// import React from "react";
import Swal from "sweetalert2";
import useAnnouncements from "../../../Hooks/useAnnouncements";
import { useAuth } from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [announcementsData, isAnnounceMentLoading, announcementRefetch] =
    useAnnouncements();

  const handleAnnoutcementSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const time = new Date().toLocaleDateString();
    const authorName = user?.displayName;
    const authorImage = user?.photoURL;

    const announcementPostData = {
      title,
      description,
      time,
      authorName,
      authorImage,
    };

    axiosSecure.post("announcements", announcementPostData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Announcement has been Posted",
          showConfirmButton: false,
          timer: 1500,
        });
        announcementRefetch();
        e.target.reset();
      }
    });

    console.log(title, description, time, authorName, authorImage);
  };

  return (
    <div className="md:max-w-[90vw] max-w-[95vw] py-10 ">
      {/* // forms */}
      <div className="py-10 shadow-lg overflow-hidden">
        <div className="  rounded from-[#113a31]  max-w-7xl mx-auto ">
          <div className="bg-white bg-opacity-50  rounded px-8 pt-6 pb-8 mb-4">
            {/* Heading */}
            <h2 className="capitalize mb-10 text-center  text-2xl md:text-3xl font-bold underline">
              Create an Announcement
            </h2>
            <form onSubmit={handleAnnoutcementSubmit} className="pb-6">
              <div className="flex justify-between">
                <div className="flex my-2 items-center gap-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">
                      {" "}
                      {user?.displayName}{" "}
                    </p>
                    <p>Email: {user?.email} </p>
                  </div>
                </div>
                <div className="font-semibold">
                  Date:
                  <span className="font-normal">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Announcement Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="title"
                    required
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Announcement Description
                </label>
                <textarea
                  id="message"
                  name="description"
                  required
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Post Description "
                ></textarea>
              </div>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="pb-10  ">
                  <input
                    type="submit"
                    className="btn bg-green-600 text-white hover:text-black hover:bg-green-500 transition "
                    value="Post"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
