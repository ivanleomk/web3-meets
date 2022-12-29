import React from "react";

type LoginFormInputProps = {
  label: string;
  type?: string;
  name?: string;
  onChangeHandler: (e: string) => void;
  value: string;
};

const LoginFormInput = ({
  label,
  onChangeHandler,
  type = "text",
  name = label.replace(" ", ""),
  value,
}: LoginFormInputProps) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          onChange={(e) => onChangeHandler(e.target.value)}
          id="email"
          name={name}
          type={type}
          autoComplete={name}
          value={value}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default LoginFormInput;
