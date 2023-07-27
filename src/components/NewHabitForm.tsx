import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

interface NewHabitFormProps {
  handleHabitCreated: () => void;
}

export default function NewHabitForm({
  handleHabitCreated,
}: NewHabitFormProps) {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function NewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    try {
      await api.post("habits", {
        title,
        weekDays,
      });

      setTitle("");
      setWeekDays([]);

      alert("Hábito criado com sucesso!");

      // Chama a função handleHabitCreated para atualizar os dados da tabela após cadastrar um novo hábito
      handleHabitCreated();
    } catch (error) {
      console.error("Error creating habit:", error);
      // Handle error (e.g., show an error message)
    }
  }
  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay];

      setWeekDays(weekDaysWithAddOne);
    }
  }

  return (
    <form
      onSubmit={NewHabit}
      action=""
      className="text-gray-300 w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>

      <input
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
        type="text"
        id="title"
        placeholder="Exercitar, dormir, etc..."
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrencia
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {daysOfWeek.map((day, index) => {
          return (
            <Checkbox.Root
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
              key={day}
              className="flex items-center gap-3  group"
            >
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
