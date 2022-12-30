import React from "react";
import { capitaliseFirstLetter } from "../utils/string";

type EventTagName = {
  name: string;
};

const EventTag = ({ name }: EventTagName) => {
  return (
    <span
      key={name}
      className="mr-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
    >
      <svg
        className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {capitaliseFirstLetter(name)}
    </span>
  );
};

export default EventTag;
