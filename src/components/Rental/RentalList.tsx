import React from "react";
import { Rental } from "../../types/Rental";

interface RentalListProps {
  rentals: Rental[];
  onDeleteRental: (rental: Rental) => void;
  onUpdateStatus: (id: string, returned: boolean) => void;
  onShowDetails: (rental: Rental) => void;
}

const RentalList: React.FC<RentalListProps> = ({
  rentals,
  onDeleteRental,
  onUpdateStatus,
  onShowDetails,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Utilisateur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Produit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date de Début
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date de Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Statut
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {rentals.map((rental) => (
            <tr
              key={rental._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                {rental.user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {rental.product.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.startDate).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(rental.endDate).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    rental.returned
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {rental.returned ? "Retourné" : "En cours"}
                </span>
              </td>
              <td className="flex items-center justify-end space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => onShowDetails(rental)}
                  className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Détails
                </button>
                <button
                  onClick={() => onUpdateStatus(rental._id, !rental.returned)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${
                    rental.returned
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {rental.returned ? "Annuler Retour" : "Marquer Retourné"}
                </button>
                <button
                  onClick={() => onDeleteRental(rental)}
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalList;
