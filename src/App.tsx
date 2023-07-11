import "./styles/global.css";

import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [dark, setDark] = useState(true);

  function handleTheme() {
    dark === true ? setDark(false) : setDark(true);
  }

  const themeStyle = !dark ? `bg-dark text-white` : `bg-light text-black`;

  return (
    <main className={` font-bold  ${themeStyle}  w-screen h-screen`}>
      <button
        className={`uppercase w-14 h-14 rounded-full bg-red-500`}
        type="button"
        onClick={() => handleTheme()}
      >
        {!dark ? "light" : "dark"}
      </button>
      <div className="justify-center items-center flex ">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        </div>
      </div>
    </main>
  );
}

export default App;
