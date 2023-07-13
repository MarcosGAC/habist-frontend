import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import ProgressBar from "./ProgressBar";
import { Check } from "phosphor-react";
interface HabitDayProps {
  completed: number;
  amount: number;
}

export default function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage = (completed / amount) * 100;
  console.log(completedPercentage);
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

  return (
    <Popover.Root>
      <Popover.Trigger
        className={` w-10 h-10 ${className} border-2  rounded-lg cursor-pointer mb-3 mx-1`}
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] rounded-2xl bg-zinc-900 flex flex-col p-6 text-zinc-200">
          <span className="font-semibold text-zinc-400">quarta-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            12/07
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3  group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-zinc-700 border group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="font-bold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500">
                nadar
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
