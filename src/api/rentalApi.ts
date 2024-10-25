const API_URL = "http://localhost:3001/api/rentals";

import { getCookie } from "./authApi";
import { Rental } from "../types/Rental";

// Fonction pour obtenir toutes les locations
export const getAllRentals = async (): Promise<Rental[]> => {
  const authToken = getCookie("token");
  try {
    const response = await fetch(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des locations:", error);
    throw error;
  }
};

// Fonction pour obtenir les détails d'une location spécifique
export const getRentalById = async (id: string): Promise<Rental> => {
  const authToken = getCookie("token");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la location ${id}:`,
      error,
    );
    throw error;
  }
};

// Fonction pour créer une nouvelle location
export const createRental = async (rentalData: {
  startDate: string;
  endDate: string;
  user: string;
  product: string;
}): Promise<{ message: string; rental: Rental }> => {
  const authToken = getCookie("token");
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création de la location:", error);
    throw error;
  }
};

// Fonction pour mettre à jour le statut de retour d'une location
export const updateRentalStatus = async (
  id: string,
  returned: boolean,
): Promise<{ message: string; rental: Rental }> => {
  const authToken = getCookie("token");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ returned }),
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la location ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une location
export const deleteRental = async (
  id: string,
): Promise<{ message: string }> => {
  const authToken = getCookie("token");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression de la location ${id}:`, error);
    throw error;
  }
};
