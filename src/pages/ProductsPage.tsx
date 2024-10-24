import React, { useEffect, useState } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../api/productApi";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import ProductUpdate from "../components/ProductUpdate";
import AddProduct from "../components/AddProduct";
import MessageModal from "../components/MessageModal";
import ProductList from "../components/ProductList";
import { Product } from "../types/Product";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  // Ouvrir le popup de mise à jour
  const handleUpdateClick = (product: Product) => {
    setProductToUpdate(product);
    setShowUpdatePopup(true);
  };

  // Ouvrir le popup de confirmation pour supprimer un produit
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeletePopup(true);
  };

  // Fonction pour confirmer la mise à jour
  const handleConfirmUpdate = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct._id, updatedProduct);
      fetchProducts();
      setShowUpdatePopup(false);
      setProductToUpdate(null);
      setMessage("Le produit a été mis à jour avec succès.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      setMessage(
        "Le prix ou la quantité est inférieur à 0. Erreur lors de la mise à jour du produit.",
      );
      setIsSuccess(false);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete._id);
        fetchProducts();
        setShowDeletePopup(false);
        setProductToDelete(null);
        setMessage("Le produit a été supprimé avec succès.");
        setIsSuccess(true);
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        setMessage("Erreur lors de la suppression du produit.");
        setIsSuccess(false);
      }
    }
  };

  // Fonction pour ajouter un produit
  const handleAddProduct = async (product: {
    name: string;
    price: number;
    description: string;
    quantity: number;
  }) => {
    try {
      await addProduct(product);
      fetchProducts();
      setShowAddPopup(false);
      setMessage("Le produit a été ajouté avec succès.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      setMessage("Erreur lors de l'ajout du produit.");
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Liste des produits
            </h2>

            <button
              onClick={() => setShowAddPopup(true)}
              className="mt-6 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 sm:mt-0"
            >
              Ajouter un produit
            </button>
          </div>

          {/* Utilisation du nouveau composant ProductList */}
          <ProductList
            products={products}
            onUpdateClick={handleUpdateClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>

      {/* Affichage du popup d'ajout */}
      {showAddPopup && (
        <AddProduct
          onAddProduct={handleAddProduct}
          onCancel={() => setShowAddPopup(false)}
        />
      )}

      {/* Affichage du popup de confirmation */}
      {showDeletePopup && productToDelete && (
        <ConfirmDeletePopup
          productName={productToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {/* Affichage du popup de mise à jour */}
      {showUpdatePopup && productToUpdate && (
        <ProductUpdate
          product={productToUpdate}
          onUpdate={handleConfirmUpdate}
          onCancel={() => setShowUpdatePopup(false)}
        />
      )}

      {/* Affichage du modal de message */}
      {message && (
        <MessageModal
          message={message}
          isSuccess={isSuccess}
          onClose={() => setMessage(null)}
        />
      )}
    </section>
  );
};

export default ProductsPage;
