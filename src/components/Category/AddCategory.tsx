import React, { useState } from "react";

interface AddCategoryProps {
  onAddCategory: (category: { name: string; description: string }) => void;
  onCancel: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAddCategory, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onAddCategory({ name, description });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajouter une catégorie</h2>
        <form onSubmit={handleAdd}>
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
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
