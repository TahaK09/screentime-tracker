import { useState } from "react";

const screenTimeData = [
  { day: "Mon", low: 0.5, medium: 2, high: 2.5 },
  { day: "Tue", low: 1, medium: 1.5, high: 3 },
  { day: "Wed", low: 0.75, medium: 2, high: 2 },
  { day: "Thu", low: 1, medium: 2, high: 2.5 },
  { day: "Fri", low: 0.5, medium: 2, high: 2 },
  { day: "Sat", low: 0.25, medium: 1.5, high: 1.5 },
  { day: "Sun", low: 0.3, medium: 1.2, high: 1.8 },
];

export default function ScreenTimeChart() {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm text-gray-400">Avg. Daily Screen Time</h2>
          <p className="text-3xl font-semibold">6h 43m</p>
        </div>
        <select className="bg-gray-800 text-sm px-2 py-1 rounded">
          <option>Per Day</option>
          <option>Per Week</option>
        </select>
      </div>
      <div className="flex items-end justify-between h-40 mt-4">
        {screenTimeData.map((day, i) => {
          const totalHeight = 160;
          const lowHeight = (day.low / 7) * totalHeight;
          const mediumHeight = (day.medium / 7) * totalHeight;
          const highHeight = (day.high / 7) * totalHeight;

          return (
            <div key={i} className="flex flex-col items-center">
              <div className="flex flex-col justify-end h-32 w-4">
                <div
                  style={{ height: `${highHeight}px` }}
                  className="bg-green-300 rounded-t"
                />
                <div
                  style={{ height: `${mediumHeight}px` }}
                  className="bg-green-500"
                />
                <div
                  style={{ height: `${lowHeight}px` }}
                  className="bg-green-700 rounded-b"
                />
              </div>
              <span className="text-xs mt-1">{day.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
