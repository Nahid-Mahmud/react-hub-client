import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAnnouncements = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: announcementsData,
    isLoading: isAnnounceMentLoading,
    refetch: announcementRefetch,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });
  return [announcementsData, isAnnounceMentLoading, announcementRefetch];
};

export default useAnnouncements;
