import { useEffect, useState } from "react";
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
  const [dataLoaded, setDataLoaded] = useState(false);

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  const summaryDates = generateDatesFromYearBeginning();
  const minimumSumnmaryDatesSize = 18 * 7; //18 weeks
  const amountOfDaysTofill = minimumSumnmaryDatesSize - summaryDates.length;
  // console.log(summaryDates)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    api.get("summary").then((response) => {
      console.log("response:", response.data);
      setSummary(response.data);
      setDataLoaded(true); // Marca os dados como carregados após obter a resposta da API
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
        <div className="summary-container gap-1 grid grid-rows-7 grid-flow-col scrollbar-thin  scrollbar-track-gray-500 max-w-5xl scrollbar-corner-rounded-xl overflow-x-auto  scrollbar-h-5 scrollbar-thumb-violet-500">
          {summary.length >= 0 &&
            summaryDates.map((date) => {
              const dayInSummary = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              // Verifica se os dados estão carregados antes de renderizar o componente
              if (dataLoaded) {
                return (
                  <HabitDay
                    date={date}
                    amount={dayInSummary?.amount}
                    defaultCompleted={dayInSummary?.completed}
                    key={date.toString()}
                  />
                );
              } else {
                // Renderiza um componente de carregamento ou uma estrutura vazia enquanto os dados estão sendo obtidos
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