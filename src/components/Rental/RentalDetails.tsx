import React from "react";
import { Rental } from "../../types/Rental";

interface RentalDetailsProps {
  rental: Rental;
  onClose: () => void;
}

const RentalDetails: React.FC<RentalDetailsProps> = ({ rental, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow-lg dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Détails de la Location
            </h3>
            <button
              onClick={onClose}
              className="inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="size-3"
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

          {/* Modal Body */}
          <div className="space-y-4 p-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Utilisateur
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {rental.user.name} ({rental.user.email})
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Produit
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {rental.product.name}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Date de début
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Date de fin
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Statut
              </h4>
              <p
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                  rental.returned
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {rental.returned ? "Retourné" : "En cours"}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Créé le
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Dernière mise à jour
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end border-t p-4 dark:border-gray-600">
            <button
              onClick={onClose}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
