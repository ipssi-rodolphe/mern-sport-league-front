import React, { useState } from "react";
import { Rental } from "../../types/Rental";

interface RentalUpdateProps {
  rental: Rental;
  onUpdate: (updatedRental: Rental) => void;
  onCancel: () => void;
}

const RentalUpdate: React.FC<RentalUpdateProps> = ({
  rental,
  onUpdate,
  onCancel,
}) => {
  const [returned, setReturned] = useState(rental.returned);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer un objet location mis à jour
    const updatedRental: Rental = { ...rental, returned };

    // Appeler la fonction onUpdate avec les nouvelles données
    onUpdate(updatedRental);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Mettre à jour la location
            </h3>
            <button
              onClick={onCancel}
              type="button"
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

          {/* Modal body */}
          <div className="space-y-4 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Statut de retour */}
              <div>
                <label
                  htmlFor="returned"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Statut de retour
                </label>
                <select
                  id="returned"
                  value={returned ? "true" : "false"}
                  onChange={(e) => setReturned(e.target.value === "true")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  required
                >
                  <option value="true">Retourné</option>
                  <option value="false">Non retourné</option>
                </select>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onCancel}
                  type="button"
                  className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalUpdate;
