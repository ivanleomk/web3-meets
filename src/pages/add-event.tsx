import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import AddEventForm from "../components/AddEventForm";
import HeaderText from "../components/HeaderText";
import ProtectedPage from "../components/ProtectedPage";
import { EventFormState } from "../types/reactForm";
import { restrictAccessToAuthenticatedUsers } from "../utils/ssr";
import { trpc } from "../utils/trpc";

const AddEvent = () => {
  const user = useUser();
  const addEvent = trpc.events.addEvent.useMutation();

  const addEventToDatabase = async (eventData: EventFormState) => {
    const userEmail = user?.email as string;
    // This is from 1 -> 12 where 1 is January and 12 is December
    const selectedMonth = eventData.eventStart.getMonth() + 1;
    const selectedYear = eventData.eventStart.getFullYear();

    await addEvent.mutate({
      ...eventData,
      user: userEmail,
      month: selectedMonth.toString(),
      year: selectedYear.toString(),
    });
    if (addEvent.error) {
      toast.warning(
        "Error encountered when trying to create event, please try again later"
      );
    } else {
      toast.success("Event succesfully created");
    }
  };

  return (
    <ProtectedPage>
      <div className="mx-auto mt-10 max-w-4xl ">
        <HeaderText text="Add a new event" />
        <AddEventForm onSubmit={addEventToDatabase} />
        <pre></pre>
      </div>
    </ProtectedPage>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return restrictAccessToAuthenticatedUsers(ctx);
};

export default AddEvent;
