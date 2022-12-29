import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const MobileLoginButton = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <>
      {!user ? (
        <Link href="/login">
          <span className=" inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
            Login
          </span>
        </Link>
      ) : (
        <>
          <button
            className="flex w-full items-center justify-center  border border-transparent  px-4 py-2 text-base font-medium text-gray-700"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              toast.success("Logged out successfully");
            }}
          >
            Logout
          </button>
          <Link href="/add-event">
            <span className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
              Add Event
            </span>
          </Link>
        </>
      )}
    </>
  );
};

export default MobileLoginButton;
