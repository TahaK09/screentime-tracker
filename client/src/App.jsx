import { useState } from "react";
import Component from "./component-custom/charts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen flex gap-10 justify-center items-center bg-gray-800">
        <Component />
        <Component />
      </div>
    </>
  );
}

export default App;
