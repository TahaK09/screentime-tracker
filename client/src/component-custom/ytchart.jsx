import React from "react";

const YouTubeSummary = () => {
  const screenTime = 8.5; // 8 hours 30 minutes
  const limit = 10.5;

  const screenTimeHours = Math.floor(screenTime);
  const screenTimeMinutes = Math.round((screenTime % 1) * 60);

  const limitHours = Math.floor(limit);
  const limitMinutes = Math.round((limit % 1) * 60);

  const percentage = (screenTime / limit) * 100;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-2">YouTube Summary</h2>
      <div className="mb-4 border-b border-gray-500 pb-4">
        <div className="flex justify-between text-sm my-4">
          <div>
            <p className="text-gray-300">Screen time</p>
            <p className="text-lg">
              {screenTimeHours} h {screenTimeMinutes} mins
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-300">Limit</p>
            <p className="text-lg">
              {limitHours} h {limitMinutes} mins
            </p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <button className="mt-4 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm">
          Set Limit
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="text-2xl font-semibold">122</p>
          <p className="text-gray-300">Video Durations</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">39</p>
          <p className="text-gray-300">Videos Watched</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">98</p>
          <p className="text-gray-300">Videos</p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSummary;
