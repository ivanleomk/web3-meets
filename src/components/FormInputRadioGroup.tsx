import React from "react";
import { type FormikTouched, type FormikErrors } from "formik";
import { type EventFormState } from "../types/reactForm";

type RadioGroupProps = {
  label: string;
  options: {
    id: string;
    title: string;
  }[];
  formKey: keyof EventFormState;
  errors: FormikErrors<EventFormState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  touched: FormikTouched<EventFormState>;
  fullWidth?: boolean;
  value: string;
};

const FormInputRadioGroup = ({
  label,
  options,
  value,
  handleChange,
  formKey,
}: RadioGroupProps) => {
  return (
    <div className="col-span-6">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <fieldset className="mt-4">
        <legend className="sr-only">{label}</legend>
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                checked={option.id === value}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                type="radio"
                name={formKey}
                value={option.id}
                onChange={handleChange}
              />
              <label
                htmlFor={option.id}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default FormInputRadioGroup;
