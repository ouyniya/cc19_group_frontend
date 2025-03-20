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

  return (
    <>
      <div className="p-6 bg-gray-100 w-full h-screen overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
            <p className="text-3xl font-extrabold text-sky-400 mt-2">
              {data?.allUsers}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated from latest data
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Total Views</h2>
            <p className="text-3xl font-extrabold text-sky-400 mt-2">
              {data?.totalViews}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated from latest data
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Top Destination
            </h2>
            <p className="text-3xl font-extrabold text-sky-400 mt-2">
              {data?.topDestination?.topProvinces?.[0]?.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated from latest data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 h-[400px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Views Per Place
            </h2>
            <div className="h-[340px]">
              <Bar
                data={{
                  labels:
                    data?.topDestination?.topProvinces?.map((el, index) => {
                      // if (index <= 9) {
                      return el?.name;
                      // }
                    }) || [],
                  datasets: [
                    {
                      label: "Number of Views",
                      data:
                        data?.topDestination?.topProvinces?.map((el, index) => {
                          // if (index <= 9) {
                          return el?.totalViews;
                          // }
                        }) || [],
                      backgroundColor: "#5CAFF0",
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 h-[400px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-7">
              Top 5 Most Viewed Posts
            </h2>
            <ul className="text-gray-700 text-lg space-y-3">
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
                      {el?.totalViews} views
                    </strong>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
