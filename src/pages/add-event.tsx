import { useUser } from "@supabase/auth-helpers-react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import AddEventForm from "../components/AddEventForm";
import HeaderText from "../components/HeaderText";
import ProtectedPage from "../components/ProtectedPage";
import { EventCost, type EventFormState, EventType } from "../types/reactForm";
import { restrictAccessToAuthenticatedUsers } from "../utils/ssr";
import { trpc } from "../utils/trpc";

const AddEvent = () => {
  const user = useUser();
  const addEvent = trpc.events.addEvent.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.warning("Please login to submit an event");
    }
  }, []);

  const addEventToDatabase = async (eventData: EventFormState) => {
    const userEmail = user?.email as string;

    if (!user) {
      toast.warning(
        "Please login to create an event. redirecting to login page now"
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    if (!eventData.startTime || !eventData.endTime) {
      return;
    }

    await addEvent.mutate({
      ...eventData,
      startTime: eventData.startTime as Date,
      endTime: eventData.endTime as Date,
      freeEvent: eventData.freeEvent === EventCost.FREE,
      online: eventData.online === EventType.ONLINE,
      user: userEmail,
      city: "Singapore",
    });
    if (addEvent.error) {
      toast.warning(
        "Error encountered when trying to create event, please try again later"
      );
      throw new Error(addEvent.error.message);
    } else {
      toast.success("Event succesfully created");
    }

    return;
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl ">
      <HeaderText text="Add a new event" />
      <AddEventForm onSubmit={addEventToDatabase} />
      <pre></pre>
    </div>
  );
};

export default AddEvent;
