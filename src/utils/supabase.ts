import { toast } from "react-toastify";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const sendMagicLink = async (
  email: string,
  message = "Magic link sent! Please check your email"
) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    toast.warning(error.message);
  } else {
    const insertResult = await supabase.from("user").insert({ id: email });
    // Insert into the existing users table
    if (insertResult.error) {
      toast.warning(insertResult.error.message);
    } else {
      toast.success(message);
    }
  }
};

export const checkUserExists = async (email: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("id")
    .eq("id", email);

  if (error) {
    toast.warning(error.message);
  } else {
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.warning(error.message);
  }

  // Remove the user from the local storage
};
