import React from "react";
import { type FormikTouched, type FormikErrors } from "formik";

type FormInputFieldProps<T> = {
  label: string;
  formKey: keyof T;
  errors: FormikErrors<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  value: string | number | readonly string[] | undefined;
  touched: FormikTouched<T>;
  fullWidth?: boolean;
  description?: string;
};

const FormInputField = <T,>({
  label,
  formKey,
  errors,
  handleChange,
  handleBlur,
  touched,
  value,
  fullWidth = false,
  description = "",
}: FormInputFieldProps<T>) => {
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
            name={formKey as string}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <p className="block text-xs font-medium text-gray-500">{description}</p>
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
