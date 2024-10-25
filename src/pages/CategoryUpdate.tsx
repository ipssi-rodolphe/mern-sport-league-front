import React, { useState } from "react";

interface Category {
  _id?: string;
  name: string;
  description: string;
}

interface CategoryUpdateProps {
  category: Category;
  onUpdate: (updatedCategory: Category) => void;
  onCancel: () => void;
}

const CategoryUpdate: React.FC<CategoryUpdateProps> = ({ category, onUpdate, onCancel }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (category._id && name.trim() && description.trim()) {
      // Vérifier la présence de `_id`
      onUpdate({ ...category, name, description });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Modifier la catégorie</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdate;
