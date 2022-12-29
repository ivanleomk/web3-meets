import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const LoginButton = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
      {!user ? (
        <Link href="/login">
          <span className="ml-8 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
            Login
          </span>
        </Link>
      ) : (
        <>
          <button
            className="flex items-center justify-center  border border-transparent  px-4 py-2 text-base font-medium text-gray-700"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              toast.success("Logged out successfully");
            }}
          >
            Logout
          </button>
          <Link href="/add-event">
            <span className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
              Add Event
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginButton;
