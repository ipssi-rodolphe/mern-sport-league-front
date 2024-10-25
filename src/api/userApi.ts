const API_URL = "http://localhost:3001/api/auth/users";

// Fonction pour obtenir le jeton d'authentification depuis les cookies
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async () => {
  const authToken = getCookie("token");

  if (!authToken) {
    console.log("No valid token");
    return;
  }

  try {
    const response = await fetch(API_URL, {
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
    console.error("Erreur lors de la récupération des utilisateurs", error);
    throw error;
  }
};

// Fonction pour activer ou désactiver un utilisateur
export const toggleAccountStatus = async (
  userId: string,
  accountAccepted: boolean,
) => {
  const authToken = getCookie("token");

  if (!authToken) {
    console.log("No valid token");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${userId}/toggle`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ accountAccepted }),
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du statut de l'utilisateur ${userId}`,
      error,
    );
    throw error;
  }
};
