const API_URL = "http://localhost:3001/api/products";

// Définir une interface pour les paramètres
// interface ProductParams {
//   page?: number;
//   title?: string;
//   genre?: string;
//   artiste?: string;
//   sortField?: string;
//   sortOrder?: string;
//   limit?: number;
// }


// Function to get the token from cookie
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};


// Fonction pour récupérer tous les produits
export const getProducts = async () => {
  // // Destructuration des paramètres
  // const { 
  //   page = 1,
  //   title,
  //   genre,
  //   artiste,
  //   sortField = 'name',
  //   sortOrder = 'asc',
  //   limit = 10
  // } = params;

  // // Construire les paramètres de requête pour l'URL
  // const queryParams = new URLSearchParams({
  //   page: String(page),
  //   sortField,
  //   sortOrder,
  //   limit: String(limit),
  // });

  // // Ajouter les paramètres facultatifs s'ils sont présents
  // if (title) queryParams.append('title', title);
  // if (genre) queryParams.append('genre', genre);
  // if (artiste) queryParams.append('artiste', artiste);
 // Récupérer le authToken depuis les cookies 
 const authToken = getCookie('token');

 if (!authToken) {
     console.log('No valid token');
 }
  try {
    // Construire l'URL avec les paramètres de requête
    const url = `${API_URL}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${authToken}`
      }
    });
    
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
  rentalPrice: number;
  description: string;
  // quantity: number;
  category: string;
  available: boolean;
}) => {
   // Récupérer le authToken depuis les cookies 
   const authToken = getCookie('token');

   if (!authToken) {
       console.log('No valid token');
   }


  try {
    console.log("API_URL", product, API_URL);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${authToken}`
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
    rentalPrice: number;
    description: string;
    available: boolean;
    category: string;
  },
) => {
  // Récupérer le authToken depuis les cookies 
  const authToken = getCookie('token');

  if (!authToken) {
      console.log('No valid token');
  }

  const productUpdate = {
    "name": product.name,
    "description": product.description,
    "available": product.available,
    "rentalPrice": product.rentalPrice,
    "category": product.category,
}
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${authToken}`
      },
      body: JSON.stringify(productUpdate),
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
   // Récupérer le authToken depuis les cookies 
   const authToken = getCookie('token');

   if (!authToken) {
       console.log('No valid token');
   }
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization' : `Bearer ${authToken}`
      }
      
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
