import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
interface HabitDayProps {
  completed?: number;
}

export default function HabitDay(props: HabitDayProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className=" w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-pointer mb-3 mx-1">
        {props.completed}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] rounded-2xl bg-zinc-900 flex flex-col p-6 text-zinc-200">
          <span className="font-semibold text-zinc-400">quarta-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            12/07
          </span>

        <ProgressBar progress={10}/>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
