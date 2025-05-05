import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Tooltip } from "recharts";

const chartData = [
  { name: "Facebook", value: 400 },
  { name: "Youtube", value: 300 },
  { name: "Instagram", value: 300 },
  { name: "Whatsapp Web", value: 200 },
];

// Custom fixed color palette (match the image)
const COLORS = ["#F59E0B", "#FCD34D", "#34D399", "#60A5FA"];

const PieChartCard = () => {
  const [optionState, setOptionState] = useState("Per Day");
  const showOptions = (e) => {
    e.preventDefault();

    setOptionState(e.currentTarget.getAttribute("data-value"));
  };

  return (
    <div className="dark bg-gray-900 text-white rounded-2xl shadow-xl p-5 w-full max-w-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold mb-2">Top Products</h1>

        <div className="flex flex-row gap-3">
          <div className="relative group">
            <button className="flex flex-row justify-between items-center mb-5 px-2 bg-gray-700  border-gray-200 rounded-lg w-24 h-7 text-sm">
              {optionState}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-gray-700 shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                data-value="Per Day"
                onClick={(e) => showOptions(e)}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Per Day
              </li>
              <li
                data-value="Per Week"
                onClick={(e) => showOptions(e)}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Per Week
              </li>
            </ul>
          </div>
          <div className="relative group">
            <button className="text-sm text-gray-400 mb-5 hover:bg-gray-600 p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                />
              </svg>
            </button>
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-gray-700 shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => console.log("this was clicked")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => console.log("logout was clicked")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Pie Chart */}
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              animationDuration={1000}
              animationEasing="ease"
              data={chartData}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Labels */}
        <div className="space-y-4 ml-4">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-300">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
