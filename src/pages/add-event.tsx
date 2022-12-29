import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import ProtectedPage from "../components/ProtectedPage";

const AddEvent = () => {
  return <ProtectedPage>AddEvent - Protected Page</ProtectedPage>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default AddEvent;
