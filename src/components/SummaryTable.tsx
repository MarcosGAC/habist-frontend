import HabitDay from "./HabitDay";
import dayjs from "dayjs";

import { Summary } from "./types/summaryType.tsx";

interface SummaryTableProps{
  summary:Summary;
  dataLoaded: boolean;
  amountOfDaysTofill: number;
  onCheckNewHabitCreated: () => void;
  summaryDates: Date[];
}

export default function SummaryTable({
  summary,
  dataLoaded,
  amountOfDaysTofill,
  onCheckNewHabitCreated,
  summaryDates,
}: SummaryTableProps) {
  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="w-full flex justify-center">
      <div className="flex">
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
        <div className="summary-container gap-1 grid grid-rows-7 grid-flow-col scrollbar-thin scrollbar-track-gray-500 max-w-5xl scrollbar-corner-rounded-xl overflow-x-auto scrollbar-h-5 scrollbar-thumb-violet-500">
          {summary.length >= 0 &&
            summaryDates.map((date) => {
              const dayInSummary = summary.find((day) => {
                return dayjs(date).isAfter(day.date, "day"); //to usando isAfter por conta do fuso do deploy do backend
              });

              if (dataLoaded) {
                return (
                  <HabitDay
                    date={date}
                    amount={dayInSummary?.amount}
                    defaultCompleted={dayInSummary?.completed}
                    key={date.toString()}
                    onCheckNewHabitCreated={onCheckNewHabitCreated}
                  />
                );
              } else {
                return (
                  <div
                    key={date.toString()}
                    className="w-10 h-10 bg-zinc-900 border-2 opacity-40 cursor-not-allowed border-zinc-800 rounded-lg"
                  ></div>
                );
              }
            })}
          {amountOfDaysTofill > 0 &&
            Array.from({ length: amountOfDaysTofill }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-10 h-10 bg-zinc-900 border-2 opacity-40 cursor-not-allowed border-zinc-800 rounded-lg"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
