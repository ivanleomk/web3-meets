import React from "react";
import DatePicker from "react-datepicker";
import {
  type FormikTouched,
  type FormikErrors,
  useFormikContext,
} from "formik";
import { type EventFormState } from "../types/reactForm";
import { sub } from "date-fns";

type FormDatePickerProps = {
  label: string;
  value: Date;
  formKey: keyof EventFormState;
  errors: FormikErrors<EventFormState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  touched: FormikTouched<EventFormState>;
  fullWidth?: boolean;
};

const FormDatePicker = ({
  label,
  formKey,
  errors,
  handleBlur,
  touched,
  value,
}: FormDatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <DatePicker
          className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          selected={value}
          onChange={(val) => {
            setFieldValue(formKey, val);
          }}
          onBlur={handleBlur}
          name={formKey}
          dateFormat="Pp"
          minDate={sub(new Date(), { days: 1 })}
          showTimeSelect
        />
      </div>
      <p className="text-sm text-red-300 ">
        {errors?.[formKey] && touched?.[formKey]
          ? (errors[formKey] as string)
          : null}
      </p>
    </div>
  );
};

export default FormDatePicker;
