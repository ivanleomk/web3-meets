export type EventFormState = {
  eventName: string;
  eventStart: Date;
  eventEnd: Date;
  eventDescription: string;
  location: string;
  eventImage: string;
  // Free or Paid
  eventCost: string;
  // Online or In-Person
  eventType: string;
};

export const initialFormState: EventFormState = {
  eventName: "",
  eventStart: new Date(),
  eventEnd: new Date(),
  eventDescription: "",
  location: "",
  eventImage: "",
  eventCost: "free",
  eventType: "online",
};
