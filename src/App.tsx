import "./styles/global.css";
import "./lib/dayjs.ts";

import { useState } from "react";
import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";

function App() {
  const [dark, setDark] = useState(true);

  function handleTheme() {
    dark === true ? setDark(false) : setDark(true);
  }

  const themeStyle = !dark ? `bg-dark text-white` : `bg-light text-black`;

  return (
    <main
      className={`${themeStyle}  w-screen h-screen transition-colors duration-1000`}
    >
      <button
        className={`uppercase w-14 h-14 rounded-full bg-red-500 `}
        type="button"
        onClick={() => handleTheme()}
      >
        {!dark ? "light" : "dark"}
      </button>
      <div className="justify-center items-center flex pt-20">
        <div className="w-full px-6 flex flex-col gap-16">
          <Header dark={dark} />
          <SummaryTable />
        </div>
      </div>
    </main>
  );
}

export default App;
