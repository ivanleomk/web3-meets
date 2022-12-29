import React from "react";
import { joinClassNames } from "../utils/css";
import { getDayFromDateString } from "../utils/date";

type CalendarCellProps = {
  isSelected: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: string;
  daysLength: number;
  daysIdx: number;
  onClickHandler: () => void;
};

const CalendarCell = ({
  isSelected,
  isCurrentMonth,
  isToday,
  date,
  daysLength,
  daysIdx,
  onClickHandler,
}: CalendarCellProps) => {
  return (
    <button
      key={date}
      onClick={onClickHandler}
      className={joinClassNames(
        "py-1.5 hover:bg-gray-100 focus:z-10",
        isCurrentMonth ? "bg-white" : "bg-gray-50",
        isSelected || isToday ? "font-semibold" : "",
        isSelected ? "text-white" : "",
        !isSelected && isCurrentMonth && !isToday ? "text-gray-900" : "",
        !isSelected && !isCurrentMonth && !isToday ? "text-gray-400" : "",
        isToday && !isSelected ? "text-indigo-600" : "",
        daysIdx === 0 ? "rounded-tl-lg" : "",
        daysIdx === 6 ? "rounded-tr-lg" : "",
        daysIdx === daysLength - 7 ? "rounded-bl-lg" : "",
        daysIdx === daysLength - 1 ? "rounded-br-lg" : ""
      )}
    >
      <time
        dateTime={date}
        className={joinClassNames(
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
          isSelected && isToday ? "bg-indigo-600" : "",
          isSelected && !isToday ? "bg-gray-900" : ""
        )}
      >
        {getDayFromDateString(date)}
      </time>
    </button>
  );
};

export default CalendarCell;
