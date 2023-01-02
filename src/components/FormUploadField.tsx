import { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import {
  useFormikContext,
  type FormikErrors,
  type FormikTouched,
} from "formik";
import { toast } from "react-toastify";

const BUCKET_URL = "https://web3meets.s3.ap-southeast-1.amazonaws.com/";
const fileTypes = ["JPG", "PNG", "JPEG"];

type FormUploadFieldProps<T> = {
  label: string;
  value: string;
  formKey: keyof T;
  errors: FormikErrors<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: any;
  touched: FormikTouched<T>;
};

const FormUploadField = <T,>({
  label,
  value,
  formKey,
  touched,
  errors,
}: FormUploadFieldProps<T>) => {
  const [file, setFile] = useState<File>();
  const [uploadedFile, setUploadedFile] = useState<string | null>();
  const { setFieldValue, setFieldError } = useFormikContext();

  const handleChange = (file: File) => {
    setFile(file);
    setUploadedFile(null);
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const {
      data: { url },
    } = await axios.post("/api/s3/get-presigned-url", {
      name: file.name,
      type: file.type,
    });

    axios
      .put(url, file, {
        headers: {
          "Content-type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((_) => {
        toast.success("Image succesfully uploaded");
        setUploadedFile(BUCKET_URL + file.name);
        setFieldValue(formKey as string, BUCKET_URL + file.name);
      })
      .catch((_) => {
        setFieldError(
          formKey as string,
          "Unable to upload image,please try again"
        );
      });
  };

  return (
    <div className="col-span-6">
      <div className="mb-4 md:flex  md:flex-row md:items-center md:justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="hidden md:block">
          {file && (
            <button
              type="button"
              onClick={() => uploadFile()}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Upload Image
            </button>
          )}
        </div>
      </div>

      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={5}
      >
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!file ? (
              <>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG,JPEG up to 5MB</p>{" "}
              </>
            ) : (
              <div className="flex text-sm text-gray-600">
                <p className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  {file.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </FileUploader>
      <div className="my-4 md:hidden">
        {file && (
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload Image
          </button>
        )}
      </div>

      {uploadedFile ? (
        <p className="text-sm text-gray-500">File uploaded succesfully</p>
      ) : null}
    </div>
  );
};

export default FormUploadField;
