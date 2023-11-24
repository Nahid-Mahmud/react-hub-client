import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAnnouncements = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: announcementsData=[],
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




// https://i.ibb.co/Xj8LzGY/profile1.jpg
// https://i.ibb.co/9hRxjnS/profile2.jpg
// https://i.ibb.co/yQX8L5H/profile3.jpg
