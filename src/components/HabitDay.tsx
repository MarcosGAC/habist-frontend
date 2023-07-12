import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
interface HabitDayProps {
  completed: number;
  amount: number;
}

export default function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage = (completed / amount) * 100;
  console.log(completedPercentage);
  let className = "zinc-900";

  if (completedPercentage >= 20 && completedPercentage < 40) {
    className = "violet-400";
  } else if (completedPercentage >= 40 && completedPercentage < 60) {
    className = "violet-500";
  } else if (completedPercentage >= 60 && completedPercentage < 80) {
    className = "violet-700";
  } else if (completedPercentage >= 80) {
    className = "violet-800";
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={` w-10 h-10 bg-${className} border-2 border-${className} rounded-lg cursor-pointer mb-3 mx-1`}
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] rounded-2xl bg-zinc-900 flex flex-col p-6 text-zinc-200">
          <span className="font-semibold text-zinc-400">quarta-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            12/07
          </span>

          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
