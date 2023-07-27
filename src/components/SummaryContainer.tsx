import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts";
import { api } from "../lib/axios.ts";
import Header from "./Header";
import SummaryTable from "./SummaryTable";

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export default function SummaryContainer() {
  const [summary, setSummary] = useState<Summary>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const summaryDates = generateDatesFromYearBeginning();
  const minimumSumnmaryDatesSize = 18 * 7; // 18 weeks
  const amountOfDaysTofill = minimumSumnmaryDatesSize - summaryDates.length;

  const fetchSummaryData = async () => {
    try {
      const response = await api.get("/summary");
      setSummary(response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  //funcao chamada sem recarregar a pagina

  const onCheckNewHabitCreated = async () => {
    try {
      await fetchSummaryData(); // Espera a atualização dos dados do summary
    } catch (error) {
      console.error("Error handling habit creation:", error);
    }
  };

  //recarrega os dados do summary
  async function handleHabitCreated() {
    try {
      setDataLoaded(false); // Atualiza o estado para indicar que os dados estão sendo buscados
      console.log("Fetching summary data after habit creation...");
      await fetchSummaryData(); // Espera a atualização dos dados do summary
      setDataLoaded(true); // Atualiza o estado para indicar que os dados foram buscados
    } catch (error) {
      console.error("Error handling habit creation:", error);
    }
  }
  return (
    <div className="w-full px-6 flex flex-col gap-16">
      <Header handleHabitCreated={handleHabitCreated} />
      <SummaryTable
        summary={summary}
        dataLoaded={dataLoaded}
        amountOfDaysTofill={amountOfDaysTofill}
        onCheckNewHabitCreated={onCheckNewHabitCreated}
        summaryDates={summaryDates}
      />
    </div>
  );
}
