import { PieChart } from "@mui/x-charts";

const PieChartAdmin = ({ totalPosts, totalComments, totalUsers }) => {
  return (
    <>
      <div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: totalPosts },
                { id: 1, value: totalComments },
                { id: 2, value: totalComments },
              ],
            },
          ]}
          width={320}
          height={200}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center  gap-5 my-10">
        <div className="flex flex-col items-center md:flex-row">
          <div className="h-5 w-5 bg-[#02b2af]"></div> <span>Total Posts</span>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="h-5 w-5 bg-[#2e96ff]"></div>{" "}
          <span>Total Comments</span>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="h-5 w-5 bg-[#b800d8]"></div>{" "}
          <span>Total Comments</span>
        </div>
      </div>
    </>
  );
};

export default PieChartAdmin;
