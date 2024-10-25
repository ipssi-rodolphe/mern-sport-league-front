const API_URL = "http://localhost:3001/api";

// Fonction pour obtenir le jeton d'authentification depuis les cookies
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Fonction pour enregistrer un nouvel utilisateur (register)
export const registerUser = async (user: {
  firstName: string;
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
    throw error;
  }
};

// Fonction pour connecter un utilisateur (login) et stocker le token et les informations de l'utilisateur dans le localStorage
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur: ${response.status}`);
    }

    // Récupérer les données de la réponse JSON
    const data = await response.json();

    // Récupérer le token et l'utilisateur de la réponse (par exemple : data.token et data.user)
    const { token, refreshToken, user } = data;

    if (token) {
      // Définir un cookie avec le token (facultatif, ou utilisez localStorage)
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict;`; // max-age en secondes, ici pour 1 jour

      // Stocker les informations de l'utilisateur et les jetons dans le localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur", error);
    throw error;
  }
};

// Fonction pour déconnecter l'utilisateur et nettoyer les informations du localStorage et les cookies
export const logoutUser = () => {
  try {
    // Supprimer les informations du localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Supprimer le cookie en réglant son expiration à une date passée
    document.cookie = "token=; path=/; max-age=0; SameSite=Strict";

    console.log("Déconnexion réussie");
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
    throw error;
  }
};
