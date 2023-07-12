import React from "react";
import { Plus } from "phosphor-react";
import logo from "../assets/logo.svg";

export default function Header({ dark }: any) {
  const changeTextColor = dark ? `text-black` : `text-white`;
  return (
    <div className=" w-full max-w-3xl mx-auto flex items-center justify-between">
      <div className={`${changeTextColor} text-4xl w-28 font-bold `}>
        <img src={logo} className={` justify-center items-center flex`} />
        Habits
      </div>
      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex gap-2 items-center hover:border-violet-400"
      >
        <Plus size={20} className=" text-violet-800" />
        Novo Habito
      </button>
    </div>
  );
}
