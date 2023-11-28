import { PieChart } from "@mui/x-charts";

const PieChartAdmin = ({ totalPosts, totalComments, totalUsers }) => {
  return (
    <>
      <div className="overflow-x-hidden">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: totalPosts },
                { id: 1, value: totalComments },
                { id: 2, value: totalUsers },
              ],
            },
          ]}
          width={280}
          height={200}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center  gap-5 my-10">
        <div className="flex flex-col gap-2 items-center md:flex-row">
          <div className="h-5 w-5 bg-[#02b2af] rounded-full "></div>{" "}
          <span>Total Posts</span>
        </div>
        <div className="flex flex-col gap-2 items-center md:flex-row">
          <div className="h-5 w-5 bg-[#2e96ff] rounded-full "></div>{" "}
          <span>Total Comments</span>
        </div>
        <div className="flex flex-col gap-2 items-center md:flex-row">
          <div className="h-5 w-5 bg-[#b800d8] rounded-full "></div>{" "}
          <span>Total Users</span>
        </div>
      </div>
    </>
  );
};

export default PieChartAdmin;
