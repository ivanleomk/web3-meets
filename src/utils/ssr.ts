import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";

export const restrictAccessToAuthenticatedUsers = async (
  ctx: GetServerSidePropsContext
) => {
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
