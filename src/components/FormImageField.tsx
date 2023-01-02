import { Switch } from "@headlessui/react";
import { FormikErrors, FormikTouched } from "formik";
import React, { useState } from "react";
import { EventFormState } from "../types/reactForm";
import { joinClassNames } from "../utils/css";
import FormInputField from "./FormInputField";
import FormUploadField from "./FormUploadField";

type FormImageFieldProps<T> = {
  label: string;
  formKey: keyof T;
  errors: FormikErrors<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  value: string;
  touched: FormikTouched<T>;
  fullWidth?: boolean;
  description?: string;
};

enum FormImageFieldMode {
  UserSuppliedImage = "UserSuppliedImage",
  UserUploadingImage = "UserUploadingImage",
}

const FormImageField = <T,>({
  label,
  formKey,
  errors,
  handleChange,
  handleBlur,
  touched,
  value,
  fullWidth = false,
  description = "",
}: FormImageFieldProps<T>) => {
  const [mode, setMode] = useState<FormImageFieldMode>(
    FormImageFieldMode.UserSuppliedImage
  );

  const toggleMode = () => {
    switch (mode) {
      case FormImageFieldMode.UserSuppliedImage: {
        setMode(FormImageFieldMode.UserUploadingImage);
        return;
      }
      case FormImageFieldMode.UserUploadingImage: {
        setMode(FormImageFieldMode.UserSuppliedImage);
        return;
      }
    }
  };

  return (
    <div className="col-span-6">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <Switch.Group as="div" className="my-4 flex items-center">
        <Switch
          checked={mode === FormImageFieldMode.UserSuppliedImage}
          onChange={toggleMode}
          className={joinClassNames(
            mode === FormImageFieldMode.UserSuppliedImage
              ? "bg-indigo-600"
              : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={joinClassNames(
              mode === FormImageFieldMode.UserSuppliedImage
                ? "translate-x-5"
                : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">
            Upload Image
          </span>
        </Switch.Label>
      </Switch.Group>
      {!(mode === FormImageFieldMode.UserSuppliedImage) ? (
        <>
          <FormInputField
            value={value}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            formKey={formKey}
            label={""}
            fullWidth={true}
            description={
              "Please provide a link to a banner image for the event listing"
            }
          />
        </>
      ) : (
        <FormUploadField
          value={value as string}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          formKey={formKey}
          label={""}
        />
      )}
    </div>
  );
};

export default FormImageField;
