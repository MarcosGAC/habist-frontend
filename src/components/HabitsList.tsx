import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitListProps {
  date: Date;
  handleCompletedChange: (completed: number) => void;
}

interface PossibleHabit {
  id: string;
  title: string;
  created_At: string;
}

interface HabitsInfo {
  possibleHabits: PossibleHabit[];
  completedHabits: string[];
}

export default function HabitsList({
  date,
  handleCompletedChange,
}: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | undefined>();
  useEffect(() => {
    api.get("day", {
      params: {
        date: date.toISOString(),
      },
    })
    .then((response) => {
      setHabitsInfo(response.data);
    })
    .catch((error) => {
      console.error("Error fetching habits:", error);
    });
  }, [date]);

  async function handleToggleHabit(habitId: string) {
    if (!habitsInfo) {
      console.error("Habit info is not available.");
      return;
    }

    const isHabitCompleted = habitsInfo.completedHabits.includes(habitId);
    try {
      await api.patch(`habits/${habitId}/toggle`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const completedHabits = isHabitCompleted
        ? habitsInfo.completedHabits.filter((id) => id !== habitId)
        : [...habitsInfo.completedHabits, habitId];

      setHabitsInfo((prevHabitsInfo) => {
        if (!prevHabitsInfo) {
          console.error("Previous habit info is not available.");
          return prevHabitsInfo;
        }

        return {
          ...prevHabitsInfo,
          completedHabits,
        };
      });

      handleCompletedChange(completedHabits.length);
    } catch (error) {
      console.error("Error toggling habit:", error);
      // Handle error (e.g., show an error message)
    }
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
  console.log(isDateInPast)

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            onCheckedChange={() => handleToggleHabit(habit.id)}
            disabled={isDateInPast}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            key={habit.id}
            className="flex items-center gap-3  group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-zinc-700 border group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-bold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
