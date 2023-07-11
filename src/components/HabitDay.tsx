import React from "react";
interface HabitDayProps {
  completed?: number;
}

export default function HabitDay(props: HabitDayProps) {
  return (
    <div className=" w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg">
      {props.completed}
    </div>
  );
}
