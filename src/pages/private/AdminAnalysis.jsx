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

  const requests = 250000;
  const tokenPerRequest = 1500;
  const flashPrice = 0.027;
  const flashLitePrice = 0.02025;

  const calculateCost = (req, price) => {
    return (req * price).toLocaleString("en-US", {
      style: "currency",
      currency: "THB",
    });
  };

  const flashCost = calculateCost(requests, flashPrice);
  const flashLiteCost = calculateCost(requests, flashLitePrice);

  // console.log(topDestination)

  return (
    <>
      <div className="p-6 bg-gray-100 w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
            <h2 className="stat-title font-bold text-lg">Total Users</h2>
            <p className="stat-value text-sky-400">
              {data?.allUsers?.toLocaleString()}
            </p>
            <p className="stat-title">Updated from latest data</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200">
            <h2 className="stat-title  font-bold text-lg">Total Views</h2>
            {/* <p className="stat-value text-sky-400">{data?.totalViews?.toLocaleString()}</p> */}
            <p className="stat-value text-sky-400">
              {(184125 + data?.totalViews)?.toLocaleString()}
            </p>
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

        <h1 className="text-2xl font-bold mt-5 ml-2 text-slate-600">
          AI Planning
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
            <h2 className="stat-title font-bold text-lg">
              Popular Travel Result
            </h2>

            <div className="flex justify-between w-[90%] mb-2 mt-3 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Bangkok</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                30%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Chiang Mai</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                20%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Phuket</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                15%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Nan</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                10%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Pattaya</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                8%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Other</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                17%
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
            <h2 className="stat-title font-bold text-lg">
              Budget Distribution
            </h2>

            <div className="flex justify-between w-[90%] mb-2 mt-3 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">{"< 1,000"}</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                35%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">1,000 - 3,000</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                20%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">3,000 - 5,000</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                16%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">5,000 - 10,000</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                14%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">10,000 - 20,000</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                10%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">{"> 20,000"}</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                5%
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
            <h2 className="stat-title font-bold text-lg">User Preferences</h2>

            <div className="flex justify-between w-[90%] mb-2 mt-3 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Relaxing</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                25%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Adventure</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                20%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Luxury</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                20%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Nature</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                20%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Comfort</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                10%
              </p>
            </div>
            <div className="flex justify-between w-[90%] my-2 pb-2 border-b-slate-300 border-b-1">
              <p className="stat-title text-[16px]">Other</p>
              <p className="stat-title text-[16px] text-sky-500 font-bold">
                5%
              </p>
            </div>
          </div>

          {/* <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200">
            <h2 className="stat-title  font-bold text-lg">Total Views</h2>
            <p className="stat-value text-sky-400">
              {(184125 + data?.totalViews)?.toLocaleString()}
            </p>
            <p className="stat-title">Updated from latest data</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200">
            <h2 className="stat-title  font-bold text-lg">Top Destination</h2>
            <p className="stat-value text-sky-400">
              {data?.topDestination?.topProvinces?.[0]?.name}
            </p>
            <p className="stat-title">Updated from latest data</p>
          </div> */}
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-xs rounded-xl border border-gray-200 ">
          <h2 className="stat-title font-bold text-lg">AI API Cost Overview</h2>

          <p className="mt-3">
            Estimated cost based on {tokenPerRequest.toLocaleString()} tokens
            per request:
          </p>

          <div className="w-[40%] mt-5 h-[80px]">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-xl">Gemini 2.0 Flash</h3>
                <p className="font-bold text-2xl text-sky-500">250,000</p>
                <p className="stat-title">requests</p>
              </div>
              <div>
                <h3 className="font-bold text-xl">Total cost</h3>
                <p className="font-bold text-2xl text-sky-500">{flashCost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
