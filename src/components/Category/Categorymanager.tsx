import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoriesApi";
import AddCategory from "./AddCategory";
import CategoryUpdate from "../../pages/CategoryUpdate";
import ConfirmDeletePopup from "../ConfirmDeletePopup";
import MessageModal from "../MessageModal";

// Définir une interface pour les catégories
interface Category {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  // Récupérer les catégories au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      setMessage("Erreur lors de la récupération des catégories.");
      setIsSuccess(false);
    }
  };

  // Ajouter une nouvelle catégorie
  const handleAddCategory = async (category: { name: string; description: string }) => {
    try {
      await createCategory(category);
      fetchCategories();
      setShowAddPopup(false);
      setMessage("Catégorie ajoutée avec succès.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      setMessage("Erreur lors de l'ajout de la catégorie.");
      setIsSuccess(false);
    }
  };

  // Ouvrir le popup de mise à jour
  const handleUpdateClick = (category: Category) => {
    setCategoryToUpdate(category);
    setShowUpdatePopup(true);
  };

  // Ouvrir le popup de confirmation pour supprimer une catégorie
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeletePopup(true);
  };

  // Fonction pour confirmer la mise à jour
  const handleConfirmUpdate = async (updatedCategory: Category) => {
    try {
      await updateCategory(updatedCategory._id!, updatedCategory);
      fetchCategories();
      setShowUpdatePopup(false);
      setCategoryToUpdate(null);
      setMessage("Catégorie mise à jour avec succès.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error);
      setMessage("Erreur lors de la mise à jour de la catégorie.");
      setIsSuccess(false);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete._id!);
        fetchCategories();
        setShowDeletePopup(false);
        setCategoryToDelete(null);
        setMessage("Catégorie supprimée avec succès.");
        setIsSuccess(true);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie:", error);
        setMessage("Erreur lors de la suppression de la catégorie.");
        setIsSuccess(false);
      }
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Liste des catégories
            </h2>

            <button
              onClick={() => setShowAddPopup(true)}
              className="mt-6 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 sm:mt-0"
            >
              Ajouter une catégorie
            </button>
          </div>

          <ul className="space-y-2 mt-6">
            {categories.map((category) => (
              <li key={category._id} className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{category.name}</h4>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(category)}
                    className="bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Affichage du popup d'ajout */}
      {showAddPopup && (
        <AddCategory
          onAddCategory={handleAddCategory}
          onCancel={() => setShowAddPopup(false)}
        />
      )}

      {/* Affichage du popup de mise à jour */}
      {showUpdatePopup && categoryToUpdate && (
        <CategoryUpdate
          category={categoryToUpdate}
          onUpdate={handleConfirmUpdate}
          onCancel={() => setShowUpdatePopup(false)}
        />
      )}

      {/* Affichage du popup de confirmation */}
      {showDeletePopup && categoryToDelete && (
        <ConfirmDeletePopup
          productName={categoryToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeletePopup(false)}
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

export default CategoryManager;
