import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

interface Category {
  _id: string;
  name: string;
  description: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
    }
  };

  // Ajout de catégorie
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      setNewCategory({ name: "", description: "" });
      fetchCategories();
      setMessage("Catégorie ajoutée avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      setMessage("Erreur lors de l'ajout de la catégorie.");
    }
  };

  // Update category
  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      await updateCategory(editingCategory._id, editingCategory);
      setEditingCategory(null);
      fetchCategories();
      setMessage("Catégorie mise à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error);
      setMessage("Erreur lors de la mise à jour de la catégorie.");
    }
  };

  // Gérer la suppression de catégorie
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      fetchCategories();
      setMessage("Catégorie supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      setMessage("Erreur lors de la suppression de la catégorie.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Gestion des Catégories
      </h2>

      {/* Formulaire pour ajouter une nouvelle catégorie */}
      <form onSubmit={handleAddCategory} className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Ajouter une nouvelle catégorie
        </h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Nom de la catégorie"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Description"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Ajouter
        </button>
      </form>

      {/* Liste des catégories */}
      <h3 className="text-lg font-medium text-gray-700 mb-3">Liste des catégories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium text-gray-800">{category.name}</h4>
              <p className="text-gray-600">{category.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingCategory(category)}
                className="bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulaire de mise à jour de catégorie */}
      {editingCategory && (
        <form onSubmit={handleUpdateCategory} className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Modifier la catégorie</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nom de la catégorie"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={editingCategory.description}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              onClick={() => setEditingCategory(null)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      )}

      {/* Affichage des messages */}
      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default CategoryManager;
