export enum EventType {
  INPERSON = "INPERSON",
  ONLINE = "ONLINE",
}

export enum EventCost {
  FREE = "FREE",
  PAID = "PAID",
}

export type EventFormState = {
  title: string;
  startTime: Date | null;
  endTime: Date | null;
  description: string;
  url: string;
  location: string;
  image: string;
  freeEvent: EventCost;
  online: EventType;
  organiserName: string;
};

export const initialFormState: EventFormState = {
  title: "",
  startTime: null,
  endTime: null,
  description: "",
  url: "",
  location: "",
  image: "",
  freeEvent: EventCost.FREE,
  online: EventType.INPERSON,
  organiserName: "",
};

export type EventFormErrors = Partial<{
  [key in keyof EventFormState]: string;
}>;
