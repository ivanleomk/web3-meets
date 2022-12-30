import React from "react";
import { type FormikTouched, type FormikErrors } from "formik";
import { type EventFormState } from "../types/reactForm";

type FormInputFieldProps = {
  label: string;
  formKey: keyof EventFormState;
  errors: FormikErrors<EventFormState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  value: string | number | readonly string[] | undefined;
  touched: FormikTouched<EventFormState>;
  fullWidth?: boolean;
};

const FormInputField = ({
  label,
  formKey,
  errors,
  handleChange,
  handleBlur,
  touched,
  value,
  fullWidth = false,
}: FormInputFieldProps) => {
  const styling = fullWidth
    ? "col-span-1 sm:col-span-6"
    : "col-span-1 sm:col-span-3";
  return (
    <>
      <div className={styling}>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            name={formKey}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <p className="text-sm text-red-300 ">
          {errors?.[formKey] && touched?.[formKey]
            ? (errors[formKey] as string)
            : null}
        </p>
      </div>
    </>
  );
};

export default FormInputField;
