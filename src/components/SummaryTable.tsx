import React from "react";

export default function SummaryTable() {

    const daysOfWeek = ['D','S','T','Q','Q','S','S']
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
    </div>
  );
}
