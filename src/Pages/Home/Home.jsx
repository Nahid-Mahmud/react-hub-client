// import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../Hooks/useAuth";
import Banner from "./Banner";
import PopularTags from "./PopularTags";
import { useState } from "react";
import Announcements from "./Announcements";
import AllPosts from "./AllPosts";
import useAnnouncements from "../../Hooks/useAnnouncements";
import Loader from "../../Shared/Loader";

const Home = () => {
  const [announcementsData, isAnnounceMentLoading, announcementRefetch] =
    useAnnouncements();
  const [search, setSearch] = useState(undefined);

  const handleSearch = () => {
    console.log(search);
  };
  const { user } = useAuth();
  // console.log(demoUser);
  return (
    <>
      <Helmet>
        <title>Home - ReactHub </title>
      </Helmet>
      <Banner
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <PopularTags />
      {isAnnounceMentLoading ? (
        <Loader />
      ) : (
        announcementsData.length > 0 && <Announcements />
      )}
      {/* {announcementsData.length > 0 && <Announcements />} */}
      <AllPosts search={search} />
    </>
  );
};

export default Home;

// https://i.ibb.co/Xj8LzGY/profile1.jpg
// https://i.ibb.co/9hRxjnS/profile2.jpg
// https://i.ibb.co/yQX8L5H/profile3.jpg
