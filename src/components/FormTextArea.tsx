import React from "react";
import { type FormikTouched, type FormikErrors } from "formik";
import { type EventFormState } from "../types/reactForm";

type FormTextAreaProps = {
  label: string;
  formKey: keyof EventFormState;
  errors: FormikErrors<EventFormState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  value: string | number | readonly string[] | undefined;
  touched: FormikTouched<EventFormState>;
};

const FormTextArea = ({
  label,
  formKey,
  errors,
  handleChange,
  handleBlur,
  touched,
  value,
}: FormTextAreaProps) => {
  return (
    <div className="sm:col-span-6">
      <>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <textarea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            name={formKey}
            rows={6}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-300 ">
          {errors?.[formKey] && touched?.[formKey]
            ? (errors[formKey] as string)
            : null}
        </p>
      </>
    </div>
  );
};

export default FormTextArea;
