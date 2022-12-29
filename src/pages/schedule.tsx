import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Calendar from "../components/Calendar";

const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Solana @ Metacamp - Media and Journalism in Web3?",
    tags: [{ name: "Free" }, { name: "Online" }],
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F413402809%2F992671859213%2F1%2Foriginal.20221222-140124?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=0d82debadb19620a18620e773ae3c4a9",
    location: "Starbucks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum ante quis enim consequat volutpat. Pellentesque id dignissim mauris. Maecenas quis mauris enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis eget sagittis odio. Praesent volutpat enim vitae vestibulum sodales. Nullam iaculis augue leo, id cursus ligula auctor a. Fusce sagittis mauris eget elementum venenatis. Cras venenatis ex id mollis commodo.",
  },
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Solana @ Metacamp - Media and Journalism in Web3?",
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F413402809%2F992671859213%2F1%2Foriginal.20221222-140124?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=0d82debadb19620a18620e773ae3c4a9",
    location: "Starbucks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum ante quis enim consequat volutpat. Pellentesque id dignissim mauris. Maecenas quis mauris enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis eget sagittis odio. Praesent volutpat enim vitae vestibulum sodales. Nullam iaculis augue leo, id cursus ligula auctor a. Fusce sagittis mauris eget elementum venenatis. Cras venenatis ex id mollis commodo.",
  },
];

const Schedule = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="sticky top-36">
            <Calendar />
            <button
              type="button"
              className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
          </div>
        </div>
        <ol className="mt-4 divide-y divide-gray-100 overflow-auto text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {meetings
            .concat(meetings)
            .concat(meetings.concat(meetings))
            .map((meeting) => (
              <li
                key={meeting.id}
                className="relative grid grid-cols-5 space-x-6 py-6 xl:static"
              >
                <img src={meeting.imageUrl} alt="" className="col-span-2" />
                <div className="col-span-3">
                  <div>
                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                      {meeting.name}
                    </h3>
                    {meeting.tags?.map((item) => (
                      <span
                        key={item.name}
                        className="mr-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                      >
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {item.name}
                      </span>
                    ))}
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
                        <time dateTime={meeting.datetime}>
                          {meeting.date} at {meeting.time}
                        </time>
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
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Schedule;
