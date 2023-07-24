import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
// import dayjs from "dayjs";
import { DateTime } from "luxon";
import HabitsList from "./HabitsList";
import { useState } from "react";
interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export default function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completedPercentage = amount > 0 ? (completed / amount) * 100 : 0;

  const dayAndMonth = DateTime.fromJSDate(date).toFormat("dd/MM");
  const dayOfWeek = DateTime.fromJSDate(date).toFormat("cccc");

  let className = "bg-zinc-900 border-zinc-800";

  if (completedPercentage > 0 && completedPercentage < 10) {
    className = "bg-violet-900 border-violet-800";
  } else if (completedPercentage >= 20 && completedPercentage < 40) {
    className = "bg-violet-800 border-violet-700";
  } else if (completedPercentage >= 40 && completedPercentage < 60) {
    className = "bg-violet-700 border-violet-600";
  } else if (completedPercentage >= 60 && completedPercentage <= 80) {
    className = "bg-violet-600 border-violet-500";
  } else if (completedPercentage > 80 && completedPercentage <= 100) {
    className = "bg-violet-500 border-violet-400";
  }

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={` w-10 h-10 ${className} border-2  rounded-lg cursor-pointer`}
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
          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}