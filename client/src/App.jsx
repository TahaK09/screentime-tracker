import { useState } from "react";
import Component from "./component-custom/charts";
import ScreenTimeChart from "./component-custom/screentimechart";
import YouTubeSummary from "./component-custom/ytchart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen flex gap-10 justify-center items-center bg-gray-800">
        <Component />
        <ScreenTimeChart />
        <YouTubeSummary />
      </div>
    </>
  );
}

export default App;
