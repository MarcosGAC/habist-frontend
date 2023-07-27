import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
import dayjs from "dayjs";
import HabitsList from "./HabitsList";
import { useState, useEffect } from "react";

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
  onCheckNewHabitCreated?: () => void;
}

export default function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
  onCheckNewHabitCreated,
}: HabitDayProps) {
  const [totalCompleted, setTotalCompleted] = useState(defaultCompleted);
  const [totalHabits, setTotalHabits] = useState(amount);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    // Atualiza a porcentagem de conclusão sempre que totalCompleted ou totalHabits mudarem e quando cadastrar um novo habito
    setCompletedPercentage(calculateCompletionPercentage());
    setTotalHabits(amount); //define o total de habitos com o amount
  }, [totalCompleted, totalHabits, onCheckNewHabitCreated, amount]);

  function calculateCompletionPercentage() {
    if (totalHabits > 0) {
      return (totalCompleted / totalHabits) * 100;
    }
    return 0;
  }

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  let className = "bg-zinc-900 border-zinc-800";

  if (completedPercentage > 0 && completedPercentage <= 25) {
    className = "bg-[#0e4429] border-green-950";
  } else if (completedPercentage > 25 && completedPercentage <= 50) {
    className = "bg-[#006d32] border-green-800";
  } else if (completedPercentage > 50 && completedPercentage <= 75) {
    className = "bg-[#238c3a] border-green-700";
  } else if (completedPercentage > 75 && completedPercentage < 100) {
    className = "bg-[#39d353]/90 border-green-600";
  } else if (completedPercentage == 100) {
    className = "bg-[#39d353] border-green-500";
  }

  function handleCompletedChange(completed: number) {
    setTotalCompleted(completed);
    if (onCheckNewHabitCreated) {
      onCheckNewHabitCreated(); //  após alterar a conclusão de um hábito
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={`w-10 h-10 ${className} border-2 rounded-lg cursor-pointer`}
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] rounded-2xl bg-zinc-900 flex flex-col p-6 text-zinc-200">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <HabitsList
            date={date}
            handleCompletedChange={handleCompletedChange}
          />
          <ProgressBar progress={completedPercentage} className={className}/>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
