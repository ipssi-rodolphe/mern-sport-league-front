import React from "react";
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  onUpdateClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onUpdateClick,
  onDeleteClick,
}) => {
  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {products.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-wrap items-center gap-y-4 py-6"
            >
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Nom du produit:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Prix:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {product.price} €
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Quantité:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {product.quantity > 0 ? product.quantity : "Rupture de stock"}
                </dd>
              </dl>

              {/* Actions : Modifier et Supprimer */}
              <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
                {/* Bouton Modifier */}
                <button
                  onClick={() => onUpdateClick(product)}
                  className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                >
                  Modifier
                </button>
                {/* Bouton Supprimer */}
                <button
                  onClick={() => onDeleteClick(product)}
                  className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
