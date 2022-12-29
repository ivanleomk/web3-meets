import { expectedDays } from "./mocks/dateMocks";
import {
  convertDayToMondayFirstItem,
  getCalendarDates,
  formatDate,
  compareTwoDates,
} from "./../utils/date";
import { expect, test } from "@jest/globals";
import { add } from "date-fns";

test("We can generate the right dates given a year and a month", () => {
  const currentSelectedDate = new Date("2022-01-22");
  const mockedTodayDate = new Date("2022-01-12");

  expect(
    getCalendarDates("2022", "1", currentSelectedDate, mockedTodayDate)
  ).toEqual(expectedDays);
});

test("Accurate conversion between day codes", () => {
  expect(convertDayToMondayFirstItem(0)).toBe(6);
  for (let i = 1; i < 6; i++) {
    expect(convertDayToMondayFirstItem(i)).toBe(i - 1);
  }
});

test("Formats date accurately", () => {
  const date = new Date("2021-01-01");
  expect(formatDate(date)).toBe("2021-01-01");
});

test("Accurately compares dates", () => {
  const date1 = new Date("2021-01-02");
  const date2 = add(new Date("2021-01-01"), { days: 1 });

  expect(compareTwoDates(date1, date2)).toBe(true);
});
