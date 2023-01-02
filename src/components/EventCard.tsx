import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { type Event } from "@prisma/client";
import React from "react";
import { formatDateMonth, formatDateTime } from "../utils/date";
import EventTag from "./EventTag";

type EventCardProps = {
  event: Omit<
    Event,
    "id" | "createdAt" | "updatedAt" | "approved" | "userId" | "cityName"
  >;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="grid grid-cols-5 space-x-3 rounded-md shadow-lg">
      <div className="relative col-span-2 h-48 w-full overflow-hidden rounded-t-lg sm:h-52 sm:rounded-none">
        <img
          src={event.image}
          alt=""
          className="h-full w-full object-fill object-center sm:object-contain"
        />
      </div>

      <div className="col-span-3">
        <div className="mb-2">
          <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
            {event.title}
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
                    {formatDateMonth(event.startTime)}
                  </div>
                  <div className="mt-0 text-[11px] text-gray-500 xl:mt-0 xl:text-[12px]">
                    {formatDateTime(event.startTime)}
                  </div>
                </div>
                <div className="mx-4 text-xs font-semibold text-gray-500">
                  –
                </div>
                <div>
                  <div className="mt-1 text-xs text-gray-300 xl:mt-[-1px] xl:text-sm">
                    {formatDateMonth(event.endTime)}
                  </div>
                  <div className="mt-0 text-[11px] text-gray-500 xl:mt-0 xl:text-[12px]">
                    {formatDateTime(event.endTime)}
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
            <dd>{event.location}</dd>
          </div>
        </dl>

        <p className="mt-3 text-gray-500">
          {event.description.length > 200
            ? event.description.slice(0, 150) + "..."
            : event.description}
        </p>
        <div className="mt-2 flex">
          <EventTag name={event.freeEvent ? "Free" : "Paid"} />
          <EventTag name={event.online ? "Online" : "In Person"} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
