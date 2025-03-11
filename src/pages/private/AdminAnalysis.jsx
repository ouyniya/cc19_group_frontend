import { useState } from "react";
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

const mockData = {
  totalUsers: 12430,
  totalViews: 52340,
  topMostViewedPosts: [
    { title: "Exploring Bangkok", views: 15340 },
    { title: "Discovering Chiang Mai", views: 13450 },
    { title: "Phuket Island Paradise", views: 9800 },
    { title: "Pattaya Nightlife", views: 11230 },
    { title: "Hidden Gems of Krabi", views: 10200 },
  ],
  topDestinations: ["Bangkok", "Chiang Mai", "Pattaya"],
  viewsPerPlace: {
    labels: [
      "Bangkok",
      "Chiang Mai",
      "Phuket",
      "Pattaya",
      "Krabi",
      "Hua Hin",
      "Koh Samui",
      "Chiang Rai",
      "Ayutthaya",
      "Sukhothai",
    ],
    values: [15340, 13450, 12340, 11230, 10320, 9800, 8700, 7600, 6900, 5800],
  },
  viewsOverTime: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    values: [3000, 4500, 6000, 7500, 9200],
  },
};

export default function AnalysisDashboard() {
  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen">
      <div className="flex justify-between gap-6 mb-6 text-center">
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-500">
            {mockData.totalUsers}
          </p>
          <p className="text-xs text-gray-500">Updated from latest data</p>
        </div>
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Views</h2>
          <p className="text-2xl font-bold text-blue-500">
            {mockData.totalViews}
          </p>
          <p className="text-xs text-gray-500">Updated from latest data</p>
        </div>
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Top Destination
          </h2>
          <p className="text-2xl font-bold text-orange-500">
            {mockData.topDestinations[0]}
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
                labels: mockData.viewsPerPlace.labels,
                datasets: [
                  {
                    label: "Number of Views",
                    data: mockData.viewsPerPlace.values,
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="flex-1 p-4 bg-white shadow rounded-lg text-center h-[350px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Top 5 Most Viewed Posts
          </h2>
          <ul className="text-gray-600 text-lg mt-6">
            {mockData.topMostViewedPosts.map((post, index) => (
              <li key={index} className="mb-2">
                {index + 1}. {post.title} - {post.views} views
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
