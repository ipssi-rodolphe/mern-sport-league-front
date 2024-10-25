const API_URL = "http://localhost:3001/api/categories";


// Définir une interface pour les catégories
interface Category {
    _id?: string; // Le champ _id est optionnel lors de la création
    name: string;
    description: string;
    createdAt?: string; // Champs créés automatiquement
    updatedAt?: string;
  }
  

// Fonction pour obtenir un token de cookie
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Fonction pour récupérer toutes les catégories
export const getCategories = async () => {
    // Récupérer le authToken depuis les cookies
  const authToken = getCookie("token");

  if (!authToken) {
    console.error("No valid token");
    throw new Error("No valid token");
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    throw error;
  }
};

// Fonction pour ajouter une nouvelle catégorie
export const createCategory = async (category: Category) => {
  // Récupérer le authToken depuis les cookies
  const authToken = getCookie("token");

  if (!authToken) {
    console.error("No valid token");
    throw new Error("No valid token");
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie", error);
    throw error;
  }
};

// Fonction pour mettre à jour une catégorie existante
export const updateCategory = async (
    id: string,
    category: {
      name: string;
      description: string;
    }
  ) => {
    // Récupérer le authToken depuis les cookies
    const authToken = getCookie("token");
  
    if (!authToken) {
      console.error("No valid token");
      throw new Error("No valid token");
    }
  
    // Créer un objet d'update explicitement
    const categoryUpdate = {
      name: category.name,
      description: category.description,
    };
  
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(categoryUpdate), // Envoyer seulement les champs nécessaires
      });
  
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie ${id}`, error);
      throw error;
    }
  };
  
  

// Fonction pour supprimer une catégorie
export const deleteCategory = async (id: string) => {
  // Récupérer le authToken depuis les cookies
  const authToken = getCookie("token");

  if (!authToken) {
    console.error("No valid token");
    throw new Error("No valid token");
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression de la catégorie ${id}`, error);
    throw error;
  }
};
