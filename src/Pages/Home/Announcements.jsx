import useAnnouncements from "../../Hooks/useAnnouncements";
import Loader from "../../Shared/Loader";

const Announcements = () => {
  const [announcementsData, isAnnounceMentLoading, announcementRefetch] = useAnnouncements();
  const isExistAnnouncement = announcementsData.length > 0;
  // console.log(announcementsData);
  if (isAnnounceMentLoading) {
    return <Loader />;
  }
  return isExistAnnouncement ? (
    <div className="max-w-[90rem] mx-auto pb-10 mb-5">
      {/* card starts here */}
      <p className="text-center font-bold text-3xl mb-10 underline">
        Important Announcements <span className="text-red-600">*</span>
      </p>

      <div className="grid max-w-[95vw] mx-auto mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {announcementsData.length > 0 &&
          announcementsData.map((item, index) => (
            <div className="hover:scale-110 transition-transform" key={index}>
              <div className="space-y-2 shadow-lg  p-5 rounded-md dark:bg-[#0b1222]">
                <div className="flex  items-center gap-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={item?.authorImage} />
                    </div>
                  </div>
                  <p className="text-xl font-semibold"> {item?.authorName} </p>
                </div>
                <div className="space-y-3">
                  <p className="text-lg max-w-[24rem] font-medium">{item?.title}</p>
                  <p className="text-sm max-w-[54rem] text-justify">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr />
    </div>
  ) : (
    ""
  );
};

export default Announcements;
