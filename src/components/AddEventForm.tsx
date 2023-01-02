import { useUser } from "@supabase/auth-helpers-react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  EventCost,
  type EventFormErrors,
  EventType,
  initialFormState,
  type EventFormState,
} from "../types/reactForm";
import EventCard from "./EventCard";
import FormDatePicker from "./FormDatePicker";
import FormImageField from "./FormImageField";
import FormInputField from "./FormInputField";
import FormInputRadioGroup from "./FormInputRadioGroup";
import FormTextArea from "./FormTextArea";

type EventFormProps = {
  onSubmit: (data: EventFormState) => Promise<void>;
  eventData?: EventFormState;
};

const EventForm = ({
  onSubmit,
  eventData = initialFormState,
}: EventFormProps) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={eventData}
      validate={(values) => {
        const errors: EventFormErrors = {};

        if (!values.title) {
          errors.title = "Event name is required";
        }
        if (!values.description) {
          errors.description =
            "Please provide a short description of the event that you're submitting to be listed on the site.";
        }
        if (!values.location && values.online == EventType.INPERSON) {
          errors.location = "Please provide the location of the event";
        }

        if (!values.startTime) {
          errors.startTime = "Please provide the start date of the event";
        }

        if (!values.endTime) {
          errors.endTime = "Please provide the end date of the event";
        }

        if (
          values.startTime &&
          values.endTime &&
          values.startTime > values.endTime
        ) {
          errors.endTime = "Event end date cannot be before the start date";
        }

        if (!values.image) {
          errors.image = "Please provide an image for the event";
        }

        console.log(Object.keys(errors));

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Error is automatically propogated via a toast, we only ned to reset on success
        onSubmit(values).then((_) => resetForm());

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-8 px-1 sm:px-4 ">
          <div className="space-y-8 ">
            <div>
              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Event Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Help us know more about the event that you&apos;re
                    organising
                  </p>
                </div>
                <div className="mt-6 gap-y-6 gap-x-4  sm:grid sm:grid-cols-6">
                  <FormInputField
                    value={values.title}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="title"
                    label="Name"
                  />
                  <FormInputField
                    value={values.url}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="url"
                    label="Event Link"
                  />
                  <FormInputField
                    value={values.location}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="location"
                    label="Location / URL"
                    fullWidth={true}
                    description="Leave blank if online event"
                  />
                  <FormInputField
                    value={values.organiserName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="organiserName"
                    label="Organiser Name"
                    fullWidth={true}
                    description=""
                  />
                  <FormTextArea
                    value={values.description}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="description"
                    label="Description"
                  />
                  <FormDatePicker
                    label="Event Start"
                    value={values.startTime}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="startTime"
                  />
                  <FormDatePicker
                    label="Event End"
                    value={values.endTime}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="endTime"
                  />
                  <FormImageField
                    label="Banner Image"
                    value={values.image}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formKey="image"
                  />
                  <FormInputRadioGroup
                    label="Event Cost"
                    options={[
                      { value: EventCost.FREE, label: "Free" },
                      { value: EventCost.PAID, label: "Paid" },
                    ]}
                    value={values.freeEvent}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="freeEvent"
                  />
                  <FormInputRadioGroup
                    label="Event Location"
                    options={[
                      { value: EventType.ONLINE, label: "Online" },
                      { value: EventType.INPERSON, label: "In Person" },
                    ]}
                    value={values.online}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    formKey="online"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Preview Your Listing
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Here&apos;s a quick preview of what your listing will look like
                once it&apos;s approved
              </p>
            </div>
            <div className="mx-auto mt-10">
              {Object.keys(errors).length == 0 ? (
                <EventCard
                  event={{
                    ...values,
                    startTime: values.startTime ? values.startTime : new Date(),
                    endTime: values.startTime ? values.startTime : new Date(),
                    freeEvent: values.freeEvent === EventCost.FREE,
                    online: values.online === EventType.ONLINE,
                  }}
                />
              ) : (
                <p className="text-sm text-red-500">
                  Please fix the existing errors in your listing
                </p>
              )}
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                onClick={() => router.back()}
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EventForm;
