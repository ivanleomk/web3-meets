import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import LoginFormInput from "./LoginFormInput";
import PrimaryButton from "./primaryButton";

type LoginFormProps = {
  primaryHandler: (e: string) => void;
  primaryText: string;
};

const LoginForm = ({ primaryHandler, primaryText }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="mt-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          primaryHandler(email);
        }}
      >
        <LoginFormInput
          label="Email Address"
          type="email"
          onChangeHandler={setEmail}
          name="email"
          value={email}
        />
      </form>

      <div className="mt-6 flex space-x-2">
        <PrimaryButton
          text={primaryText}
          onClickHandler={() => primaryHandler(email)}
        />
      </div>
    </div>
  );
};

export default LoginForm;
