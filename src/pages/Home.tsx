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

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories", error);
    }
  };

  // Function to fetch products from the API
  const fetchProducts = async (categoryId?: string) => {
    try {
      const data = await getProducts({ category: categoryId });
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  // Handle category click to filter products
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 w-full">
      {/* Banner Section */}
      <div
        className="relative w-full bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-bold sm:text-5xl">Sports League</h1>
          <p className="mt-4 text-xl sm:text-2xl">
            Louez en toute simplicité vos équipements sportifs
          </p>
        </div>
      </div>

      {/* Categories and Products Section */}
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 mt-10">
        {/* Display Categories */}
        <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`relative cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
                selectedCategory === category._id ? "border-indigo-600" : ""
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

        {/* Display Products as Cards */}
        <h2 className="text-center text-base font-semibold text-indigo-600 mt-16">
          Nos produits
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Product"
                className="h-48 w-full object-cover"
              />
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
