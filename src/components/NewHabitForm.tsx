import { Check } from "phosphor-react";
import React from "react";

export default function NewHabitForm() {
  return (
    <form action="" className="text-gray-300 w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>

      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
        type="text"
        id="title"
        placeholder="Exercitar, dormir, etc..."
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrencia
      </label>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 hover:bg-green-500 justify-center"
      >
        <Check size={20} weight="bold" />
        confirmar
      </button>
    </form>
  );
}
