import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createAlert } from "../../utils/createAlert";
import useAdminStores from "../../stores/useAdminStores";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalysisDashboard() {
  const store = useAdminStores();
  const {
    allUsers,
    actionAllUsers,
    totalViews,
    actionAllViews,
    actionTopDestination,
    topDestination,
    isLoading,
  } = store;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await actionAllUsers();
        await actionAllViews();
        await actionTopDestination();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }

      // Delay hiding loading animation
      // setTimeout(() => setLoading(false), 1500);
    };

    fetchAllUsers();
  }, [actionAllUsers, actionAllViews, actionTopDestination]);

  const data = {
    allUsers,
    totalViews,
    topDestination,
  };

  console.log(topDestination)

  return (
    <>
      <div className="p-6 bg-gray-100 w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
            <h2 className="stat-title font-bold text-lg">Total Users</h2>
            <p className="stat-value text-sky-400">{data?.allUsers?.toLocaleString()}</p>
            <p className="stat-title">Updated from latest data</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200">
            <h2 className="stat-title  font-bold text-lg">Total Views</h2>
            <p className="stat-value text-sky-400">{data?.totalViews?.toLocaleString()}</p>
            <p className="stat-title">Updated from latest data</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200">
            <h2 className="stat-title  font-bold text-lg">Top Destination</h2>
            <p className="stat-value text-sky-400">
              {data?.topDestination?.topProvinces?.[0]?.name}
            </p>
            <p className="stat-title">Updated from latest data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="p-6 bg-white shadow-xs rounded-xl border border-gray-200 h-[370px]">
            <h2 className="text-lg font-semibold stat-title">
              Views Per Place
            </h2>
            <div className="h-[300px]">
              <Bar
                data={{
                  labels:
                    data?.topDestination?.topProvinces
                      ?.slice(0, 10)
                      ?.map((el, index) => {
                        // if (index <= 9) {
                        return el?.name;
                        // }
                      }) || [],
                  datasets: [
                    {
                      label: "Number of Views",
                      data:
                        data?.topDestination?.topProvinces
                          ?.slice(0, 10)
                          ?.map((el, index) => {
                            // if (index <= 9) {
                            return el?.totalViews;
                            // }
                          }) || [],
                      backgroundColor: [
                        "rgba(12, 74, 110, 0.8)", // sky-900
                        "rgba(12, 80, 120, 0.8)", // sky-900
                        "rgba(7, 89, 133, 0.8)", // sky-800
                        "rgba(3, 105, 161, 0.8)", // sky-700
                        "rgba(2, 132, 199, 0.8)", // sky-600
                        "rgba(14, 165, 233, 0.8)", // sky-500
                        "rgba(56, 189, 248, 0.8)", // sky-400
                        "rgba(125, 211, 252, 0.8)", // sky-300
                        "rgba(186, 230, 253, 0.8)", // sky-200 (lighter)
                        "rgba(224, 242, 254, 0.8)", // sky-100 (lightest)
                      ],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div className="p-6 bg-white shadow-xs rounded-xl border border-gray-200 h-[370px] flex justify-center items-center ">
            <div className="w-full">
              <h2 className="text-lg font-semibold stat-title mb-5">
                Top 5 Most Viewed Posts
              </h2>
              <ul className="space-y-3 stat-title text-[14px]">
                {data?.topDestination?.topProvinces
                  ?.slice(0, 5)
                  .map((el, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b border-slate-300 pb-2"
                    >
                      <span className="flex">
                        <div className="flex justify-center items-center w-7 h-7 bg-sky-500 text-white rounded-full p-1 mr-3">
                          <strong>{index + 1}</strong>
                        </div>
                        {el?.name}
                      </span>
                      <strong className="text-sky-400">
                        {el?.totalViews?.toLocaleString()} views
                      </strong>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
