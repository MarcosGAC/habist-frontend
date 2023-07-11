import React from "react";
import HabitDay from "./HabitDay";
import { generateDatesFromYearBeginning } from "./utils/generate-dates-from-year-beginning.ts";

export default function SummaryTable() {

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  const summaryDates = generateDatesFromYearBeginning()

  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {daysOfWeek.map((day: string, index: number) => {
          return (
            <div
              key={index}
              className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date =>{
            return <HabitDay key={date.toString()} />
        })}
        
      </div>
    </div>
  );
}
