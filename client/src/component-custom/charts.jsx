import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";

// Fixed color palette
const COLORS = ["#F59E0B", "#FCD34D", "#34D399", "#60A5FA", "#0000FF"];
const today = new Date().toISOString().split("T")[0];

const PieChartCard = () => {
  const [screenTime, setScreenTime] = useState([]);
  const [optionState, setOptionState] = useState("Per Day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreenTime = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/urls");

        if (res && res.data) {
          const today = new Date().toISOString().split("T")[0];

          const transformedData =
            optionState === "Per Day"
              ? res.data.map((item) => ({
                  name: item.url,
                  value: item.screentime?.[today] || 0,
                }))
              : res.data.map((item) => {
                  const total = Object.values(item.screentime || {}).reduce(
                    (sum, min) => sum + min,
                    0
                  );
                  return { name: item.url, value: total };
                });

          setScreenTime(transformedData);
        }
      } catch (err) {
        console.error("Error fetching screen time:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenTime();
  }, [optionState]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-yellow-300">
            {value >= 60
              ? `${Math.floor(value / 60)}h ${value % 60}min`
              : `${value} mins`}
          </p>
        </div>
      );
    }
    return null;
  };

  const showOptions = (e) => {
    e.preventDefault();
    setOptionState(e.currentTarget.getAttribute("data-value"));
  };

  const st_notzero = screenTime.filter((item) => item.value !== 0);

  return (
    <div className="dark bg-gray-900 text-white rounded-2xl shadow-xl p-5 w-full max-w-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold mb-2">Screen Time</h1>

        <div className="flex flex-row gap-3">
          {/* Dropdown for Per Day / Per Week */}
          <div className="relative group">
            <button className="flex flex-row justify-between items-center mb-5 px-2 bg-gray-700 border-gray-200 rounded-lg w-24 h-7 text-sm">
              {optionState}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-gray-700 shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                data-value="Per Day"
                onClick={showOptions}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Per Day
              </li>
              <li
                data-value="Per Week"
                onClick={showOptions}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Per Week
              </li>
            </ul>
          </div>

          {/* Options button */}
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
                onClick={() => console.log("My Orders clicked")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => console.log("Logout clicked")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Loading or Chart */}
      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading...</div>
      ) : (
        <div className="flex items-center justify-between">
          {/* Pie Chart */}
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                animationDuration={1000}
                animationEasing="ease"
                data={st_notzero}
                dataKey="value"
                innerRadius="68%"
                nameKey="name"
                paddingAngle={-20}
                strokeWidth={0}
              >
                {st_notzero.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="space-y-4 ml-4">
            {st_notzero.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-sm text-gray-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartCard;
