import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Calendar from "../components/Calendar";
import EventCard from "../components/EventCard";
import EventTag from "../components/EventTag";
import { formatDate, formatDateMonth, formatDateTime } from "../utils/date";
import { trpc } from "../utils/trpc";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  // const { data } = trpc.events.getEvents.useQuery({
  //   selectedMonth: currentSelectedMonth,
  //   selectedYear: currentSelectedYear,
  // });

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="sticky top-36">
            <Calendar
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <Link href="/add-event" className="mt-8">
              <p className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add event
              </p>
            </Link>
          </div>
        </div>
        {/* <ol className="mt-4 divide-y divide-gray-100 overflow-auto text-sm leading-6 lg:col-span-7 xl:col-span-8"> */}
        {/* {!data ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center ">
                <ClipLoader />
                <p className="ml-4">Downloading the latest list of events</p>
              </div>
            </div>
          ) : (
            data
              .filter((event) => event.startTime > selectedDay)
              .map((meeting) => (
                <li
                  key={meeting.id}
                  className="relative grid grid-cols-5 space-x-6 py-6 xl:static"
              >
                  <EventCard event={meeting} />
                </li>
              ))
          )}
          {data?.filter((event) => event.startTime > selectedDay).length ==
          0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center ">
                <p className="text-center">
                  No events fit the criteria that you&apos;ve set out
                </p>
              </div>
            </div>
          ) : null}
        </ol> */}
      </div>
    </div>
  );
};

export default Schedule;
