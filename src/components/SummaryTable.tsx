import React, { useEffect, useState } from "react";
import HabitDay from "./HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts";
import { api } from "../lib/axios.ts";
import dayjs from "dayjs";

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export default function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  const summaryDates = generateDatesFromYearBeginning();
  const minimumSumnmaryDatesSize = 18 * 7; //18 weeks
  const amountOfDaysTofill = minimumSumnmaryDatesSize - summaryDates.length;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex justify-center ">
      <div className=" flex ">
        <div className="grid grid-rows-7  grid-flow-row gap-3  ">
          {daysOfWeek.map((day: string, index: number) => {
            return (
              <div
                key={index}
                className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center "
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="summary-container grid grid-rows-7 grid-flow-col scrollbar-thin  scrollbar-track-gray-500 max-w-5xl scrollbar-corner-rounded-xl overflow-x-auto  scrollbar-h-5 scrollbar-thumb-violet-500">
          {summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                date ={date}
                amount={dayInSummary?.amount}
                completed={dayInSummary?.completed}
                key={date.toString()}
              />
            );
          })}
          {amountOfDaysTofill > 0 &&
            Array.from({ length: amountOfDaysTofill }).map((_, index) => {
              return (
                <div
                  key={index}
                  className=" w-10 h-10 bg-zinc-900 border-2 opacity-40 cursor-not-allowed border-zinc-800 rounded-lg"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
