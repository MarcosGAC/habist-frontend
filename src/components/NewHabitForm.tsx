import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import React from "react";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

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

      <div className="flex flex-col gap-2 mt-3">
        {daysOfWeek.map((day) => {
          return (
            <Checkbox.Root key={day} className="flex items-center gap-3  group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-zinc-700 border group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=" text-white leading-tight">{day}</span>
            </Checkbox.Root>
          );
        })}
      </div>

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
