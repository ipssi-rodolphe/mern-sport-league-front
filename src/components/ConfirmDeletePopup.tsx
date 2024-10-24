import React from "react";

interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  productName: string; // Nom du produit à afficher dans le popup
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
  onConfirm,
  onCancel,
  productName,
}) => {
  return (
    <div
      id="confirm-delete-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Supprimer le produit
            </h3>
            <button
              onClick={onCancel}
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
              <span className="sr-only">Fermer</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="space-y-4 p-6">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Êtes-vous sûr de vouloir supprimer le produit{" "}
              <strong>{productName}</strong> ? Cette action est irréversible.
            </p>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={onConfirm}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
