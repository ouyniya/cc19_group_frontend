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
    <div className="p-6 bg-gray-50 w-full min-h-screen">
      <div className="flex justify-between gap-6 mb-6 text-center">
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-500">{data?.allUsers}</p>
          <p className="text-xs text-gray-500">Updated from latest data</p>
        </div>
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Views</h2>
          <p className="text-2xl font-bold text-blue-500">{data?.totalViews}</p>
          <p className="text-xs text-gray-500">Updated from latest data</p>
        </div>

        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Top Destination
          </h2>
          <p className="text-2xl font-bold text-orange-500">
            {data?.topDestination?.topProvinces?.[0]?.name}
          </p>
          <p className="text-xs text-gray-500">Updated from latest data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-lg h-[350px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Views Per Place
          </h2>
          <div className="h-[300px]">
            <Bar
              data={{
                labels:
                  data?.topDestination?.topProvinces?.map((el) => el?.name) ||
                  [],
                datasets: [
                  {
                    label: "Number of Views",
                    data:
                      data?.topDestination?.topProvinces?.map(
                        (el) => el?.totalViews
                      ) || [],
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="flex-1 p-9 bg-white shadow rounded-lg text-left h-[350px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Top 5 Most Viewed Posts
          </h2>
          <ul className="text-gray-600 text-lg mt-6">
            {data?.topDestination?.topProvinces?.map((el, index) => {
              if (index <= 5) {
                return (
                  <li key={index} className="mb-2">
                    {index + 1}. {el?.name} -
                    <strong>{el?.totalViews} views</strong>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
