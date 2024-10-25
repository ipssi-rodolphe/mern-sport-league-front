import React, { useEffect, useState } from "react";
import { getCategories } from "../api/categoriesApi";
import { getProducts } from "../api/productApi";
import { Product } from "../types/Product";

interface Category {
  _id: string;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fonction pour récupérer les catégories à partir de l'API
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories", error);
    }
  };

  // Fonction pour récupérer les produits à partir de l'API
  const fetchProducts = async (categoryId?: string) => {
    try {
      const data = await getProducts({ category: categoryId });
      setProducts(data);
      setFilteredProducts(data); // Initialiser les produits filtrés avec tous les produits
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  // Filtrer les produits par catégorie sélectionnée
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId); // Récupérer les produits filtrés par catégorie depuis l'API
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">
          Bienvenue à notre boulangerie
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Découvrez nos délicieuses catégories de produits
        </p>

        {/* Affichage des catégories */}
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`relative cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
                selectedCategory === category._id ? "border-2 border-indigo-600" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-lg"></div>
              <div className="relative flex flex-col h-full overflow-hidden rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Affichage des produits sous forme de cartes */}
        <h2 className="text-center text-base font-semibold text-indigo-600 mt-16">
          Nos produits
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-sm text-gray-800 font-bold">
                  {product.rentalPrice} €
                </p>
                <p className="mt-2 text-sm text-gray-800">
                  {product.available ? "Disponible" : "Indisponible"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
