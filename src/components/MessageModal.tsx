import React from "react";

interface MessageModalProps {
  message: string;
  isSuccess: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  isSuccess,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700">
        <button
          onClick={onClose}
          className="absolute end-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div className="p-4 text-center md:p-5">
          <svg
            className={`mx-auto mb-4 h-12 w-12 ${
              isSuccess ? "text-green-400" : "text-red-400"
            } dark:text-gray-200`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isSuccess
                  ? "M5 13l4 4L19 7"
                  : "M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              }
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className={`text-white ${
              isSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } focus:outline-none focus:ring-4 focus:ring-${isSuccess ? "green" : "red"}-300 dark:focus:ring-${isSuccess ? "green" : "red"}-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
