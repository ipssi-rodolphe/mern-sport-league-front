const API_URL = "http://localhost:3001/api/products";

// Fonction pour récupérer tous les produits
export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    throw error;
  }
};

// Fonction pour ajouter un nouveau produit
export const addProduct = async (product: {
  name: string;
  price: number;
  description: string;
  quantity: number;
}) => {
  try {
    console.log("API_URL", product, API_URL);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit", error);
    throw error;
  }
};

// Fonction pour mettre à jour un produit existant
export const updateProduct = async (
  id: string,
  product: {
    name: string;
    price: number;
    description: string;
    quantity: number;
  },
) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du produit ${id}`, error);
    throw error;
  }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit ${id}`, error);
    throw error;
  }
};
