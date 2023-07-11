import React from "react";
import { Plus } from "phosphor-react";

export default function Header() {
  return (
    <div className=" w-full max-w-3xl mx-auto flex items-center justify-between">
      <div className="w-28 h-28 bg-purple-600 justify-center items-center flex">
        logo aqui
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
