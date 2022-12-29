import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import React, { useState } from "react";
import { joinClassNames } from "../utils/css";
import {
  compareTwoDates,
  getCalendarDates,
  isCurrentMonth,
} from "../utils/date";
import CalendarCell from "./CalendarCell";

const Calendar = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today);

  const days = getCalendarDates(
    currentYear.toString(),
    currentMonth.toString(),
    selectedDay,
    today
  );

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div>
      <div className=" flex items-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon
            onClick={() => handlePreviousMonth()}
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
        <div className="flex-auto font-semibold">
          {format(new Date(currentYear, currentMonth - 1), "MMMM yyyy")}
        </div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon
            onClick={() => handleNextMonth()}
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => {
          return (
            <CalendarCell
              onClickHandler={() => setSelectedDay(new Date(day.date))}
              key={dayIdx}
              isSelected={compareTwoDates(selectedDay, new Date(day.date))}
              isCurrentMonth={isCurrentMonth(
                new Date(day.date),
                currentMonth.toString(),
                currentYear.toString()
              )}
              isToday={compareTwoDates(today, new Date(day.date))}
              date={day.date}
              daysLength={days.length}
              daysIdx={dayIdx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
