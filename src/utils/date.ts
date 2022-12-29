import { sub, format, add } from "date-fns";

export const getCalendarDates = (
  year: string,
  month: string,
  selectedDate: Date,
  today: Date
) => {
  const formattedDateString = `${year}-${month.padStart(2, "0")}-01`;

  const date = new Date(formattedDateString);

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const days = [];

  for (let i = convertDayToMondayFirstItem(firstDay) - 1; i >= 0; i--) {
    const beforeDate = sub(date, { days: i + 1 });
    days.push({ date: formatDate(beforeDate) });
  }
  for (let i = 0; i < daysInMonth; i++) {
    const monthDate = add(date, { days: i });
    days.push({
      date: formatDate(monthDate),
      ...(compareTwoDates(monthDate, today) && { isToday: true }),
      ...(compareTwoDates(monthDate, selectedDate) && { isSelected: true }),
      isCurrentMonth: true,
    });
  }
  for (let i = 0; i < 6 - convertDayToMondayFirstItem(lastDay); i++) {
    const afterDate = add(date, { days: daysInMonth + i });
    days.push({ date: formatDate(afterDate) });
  }
  return days;
};

export const convertDayToMondayFirstItem = (dayCode: number) => {
  if (dayCode === 0) {
    return 6;
  }
  return dayCode - 1;
};

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const compareTwoDates = (date1: Date, date2: Date) => {
  return formatDate(date1) === formatDate(date2);
};

export const getDayFromDateString = (dateString: string) => {
  return format(new Date(dateString), "d");
};

export const isCurrentMonth = (
  date: Date,
  currentMonth: string,
  currentYear: string
) => {
  return format(new Date(date), "M-yyyy") === `${currentMonth}-${currentYear}`;
};
