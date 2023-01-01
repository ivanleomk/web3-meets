import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Calendar from "../components/Calendar";
import EventTag from "../components/EventTag";
import { formatDate, formatDateMonth, formatDateTime } from "../utils/date";
import { trpc } from "../utils/trpc";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const currentSelectedMonth = selectedDay.getMonth() + 1;
  const currentSelectedYear = selectedDay.getFullYear();

  const { data } = trpc.events.getEvents.useQuery({
    selectedMonth: currentSelectedMonth,
    selectedYear: currentSelectedYear,
  });

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
        <ol className="mt-4 divide-y divide-gray-100 overflow-auto text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {!data ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center ">
                <ClipLoader />
                <p className="ml-4">Downloading the latest list of events</p>
              </div>
            </div>
          ) : (
            data
              .filter((event) => event.eventStart > selectedDay)
              .map((meeting) => (
                <li
                  key={meeting.id}
                  className="relative grid grid-cols-5 space-x-6 py-6 xl:static"
                >
                  <img src={meeting.eventImage} alt="" className="col-span-2" />
                  <div className="col-span-3">
                    <div className="mb-2">
                      <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                        {meeting.title}
                      </h3>
                    </div>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                      <div className="flex items-start space-x-3">
                        <dt className="mt-0.5">
                          <span className="sr-only">Date</span>
                          <CalendarIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd>
                          <div className="flex flex-shrink-0 items-center text-left text-gray-300">
                            <div>
                              <div className="mt-1 text-xs text-gray-300 xl:mt-[-1px] xl:text-sm">
                                {formatDateMonth(meeting.eventStart)}
                              </div>
                              <div className="mt-0 text-[11px] text-gray-500 xl:mt-0 xl:text-[12px]">
                                {formatDateTime(meeting.eventStart)}
                              </div>
                            </div>
                            <div className="mx-4 text-xs font-semibold text-gray-500">
                              –
                            </div>
                            <div>
                              <div className="mt-1 text-xs text-gray-300 xl:mt-[-1px] xl:text-sm">
                                {formatDateMonth(meeting.eventEnd)}
                              </div>
                              <div className="mt-0 text-[11px] text-gray-500 xl:mt-0 xl:text-[12px]">
                                {formatDateTime(meeting.eventEnd)}
                              </div>
                            </div>
                          </div>
                        </dd>
                      </div>
                      <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                          <span className="sr-only">Location</span>
                          <MapPinIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd>{meeting.location}</dd>
                      </div>
                    </dl>

                    <p className="mt-3 text-gray-500">
                      {meeting.description.length > 200
                        ? meeting.description.slice(0, 150) + "..."
                        : meeting.description}
                    </p>
                    <div className="mt-2 flex">
                      <EventTag name={meeting.eventType} />
                      <EventTag name={meeting.eventCost} />
                    </div>
                  </div>
                </li>
              ))
          )}
          {data?.filter((event) => event.eventStart > selectedDay).length ==
          0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center ">
                <p className="text-center">
                  No events fit the criteria that you&apos;ve set out
                </p>
              </div>
            </div>
          ) : null}
        </ol>
      </div>
    </div>
  );
};

export default Schedule;
