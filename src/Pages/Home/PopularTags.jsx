import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PopularTags = () => {
  const axiosPublic = useAxiosPublic();
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tags");
      return res.data;
    },
  });
  return (
    <div className="max-w-[90rem] pb-10 mx-auto">
      <h1 className="text-3xl font-bold text-center my-10 capitalize underline">
        Popular Tags you can search on!
      </h1>

      <div className="flex items-center gap-7 pb-10 justify-center">
        {tags.map((tag, index) => (
          <p key={index} className="capitalize font-semibold text-xl ">
            {tag.tag}
          </p>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default PopularTags;
