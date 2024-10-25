import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { getCategories } from "../api/categoriesApi";

interface ProductUpdateProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  onCancel: () => void;
}

interface Category {
  _id: string;
  name: string;
}

const ProductUpdate: React.FC<ProductUpdateProps> = ({
  product,
  onUpdate,
  onCancel,
}) => {
  const [name, setName] = useState(product.name);
  const [rentalPrice, setRentalPrice] = useState(product.rentalPrice);
  const [description, setDescription] = useState(product.description);
  const [available, setAvailable] = useState(product.available);
  const [category, setCategory] = useState(product.category || ""); // Initialiser avec une chaîne vide par défaut
  const [categories, setCategories] = useState<Category[]>([]);

  // Fonction pour charger les catégories
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);

      // Si la catégorie actuelle est null, définir la première catégorie disponible comme valeur par défaut
      if (!product.category && data.length > 0) {
        setCategory(data[0]._id);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer un objet produit mis à jour
    const updatedProduct: Product = {
      ...product,
      name,
      rentalPrice,
      description,
      available,
      category,
    };
    console.log("Produit mis à jour:", updatedProduct);

    // Appeler la fonction onUpdate avec les nouvelles données
    onUpdate(updatedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Modifier le produit
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom du produit
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rentalPrice"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prix
                </label>
                <input
                  type="number"
                  id="price"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(parseFloat(e.target.value))}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Sélection de la catégorie */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Catégorie
                </label>
                <select
                  id="category"
                  value={category || ""} // Assurer une valeur par défaut
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sélection de la disponibilité */}
              <div>
                <label
                  htmlFor="available"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Disponible
                </label>
                <select
                  id="available"
                  value={available ? "true" : "false"}
                  onChange={(e) => setAvailable(e.target.value === "true")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

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

export default ProductUpdate;
