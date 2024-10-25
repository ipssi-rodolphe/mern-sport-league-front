import React, { useState, useEffect } from "react";
import { getCategories } from "../api/categoriesApi"; // Assurez-vous d'importer la fonction correcte pour récupérer les catégories

interface AddProductPopupProps {
  onAddProduct: (product: {
    name: string;
    rentalPrice: number;
    description: string;
    // quantity: number;
    available: boolean;
    category: string;
  }) => void;
  onCancel: () => void;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({
  onAddProduct,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [rentalPrice, setRentalPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  // const [quantity, setQuantity] = useState<number | "">("");
  const [available, setAvailable] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  // Fonction pour récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && rentalPrice && description !== "" && category) {
      onAddProduct({
        name,
        rentalPrice: Number(rentalPrice),
        description,
        // quantity: Number(quantity),
        available,
        category,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b pb-4 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ajouter un produit
          </h2>
          <button
            onClick={onCancel}
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom du produit
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rentalPrice"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Prix de location
            </label>
            <input
              type="number"
              id="rentalPrice"
              value={rentalPrice}
              onChange={(e) =>
                setRentalPrice(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>

          {/* <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantité
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value ? parseInt(e.target.value, 10) : "")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div> */}

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Catégorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            >
              <option value="" disabled>
                Sélectionnez une catégorie
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="available"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Disponible
            </label>
            <select
              id="available"
              value={available ? "true" : "false"}
              onChange={(e) => setAvailable(e.target.value === "true")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
