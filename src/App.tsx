import "./styles/global.css";
import { useState } from "react";
import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";


function App() {
  const [dark, setDark] = useState(true);
  const themeStyle = dark ? "bg-dark text-white" : "bg-light text-black";

  function handleTheme() {
    setDark(!dark);
  }


  return (
    <main
      className={`${themeStyle} w-screen h-screen transition-colors duration-1000`}
    >
      <button
        className="uppercase w-14 h-14 rounded-full bg-red-500"
        type="button"
        onClick={handleTheme}
      >
        {dark ? "dark" : "light"}
      </button>
      <div className="flex justify-center items-center pt-20">
        <div className="w-full px-6 flex flex-col gap-16">
          <Header />
          <SummaryTable />
        </div>
      </div>
    </main>
  );
}

export default App;
