import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import LoginForm from "../components/LoginForm";
import { checkUserExists, sendMagicLink } from "../utils/supabase";

const Signup = () => {
  const handleSignup = (email: string) => {
    if (!checkUserExists(email)) {
      sendMagicLink(email);
    } else {
      toast.warning(
        "An Email with this account already exists. Please try logging in instead."
      );
    }
  };
  return (
    <div className="h-screen bg-white">
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="mb-4">
                <Link href="/">
                  <ArrowLeftCircleIcon className="h-6 w-6" />
                </Link>
              </div>

              <div className="space-x-4s flex items-center justify-center">
                <Image
                  src="/logo.png"
                  height={40}
                  width={40}
                  alt="Web3 Meets Logo"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign up for an account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link href="/login">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    sign in to your account today
                  </span>
                </Link>
              </p>
            </div>

            <LoginForm
              primaryHandler={handleSignup}
              primaryText={"Create Account"}
            />
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
