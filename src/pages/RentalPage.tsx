import React, { useEffect, useState } from "react";
import RentalList from "../components/Rental/RentalList";
import RentalDetails from "../components/Rental/RentalDetails";
import RentalUpdate from "../components/Rental/RentalUpdate";
import MessageModal from "../components/MessageModal";
import ConfirmActionPopup from "../components/ConfirmActionPopup";
import {
  getAllRentals,
  deleteRental,
  updateRentalStatus,
} from "../api/rentalApi";
import { Rental } from "../types/Rental";

const RentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); // Contrôle de l'affichage de RentalUpdate
  const [rentalToDelete, setRentalToDelete] = useState<Rental | null>(null);
  const [rentalToShow, setRentalToShow] = useState<Rental | null>(null);
  const [rentalToUpdate, setRentalToUpdate] = useState<Rental | null>(null); // Location sélectionnée pour mise à jour

  // Charger toutes les locations
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getAllRentals();
        setRentals(data);
      } catch (error) {
        setMessage("Erreur lors du chargement des locations.");
        setIsSuccess(false);
      }
    };
    fetchRentals();
  }, []);

  // Ouvre le popup de confirmation pour supprimer une location
  const handleDeleteRental = (rental: Rental) => {
    setRentalToDelete(rental);
    setShowConfirmPopup(true);
  };

  // Ouvre le popup des détails pour une location
  const handleShowDetails = (rental: Rental) => {
    setRentalToShow(rental);
    setShowDetailsPopup(true);
  };

  // Ouvre le popup de mise à jour pour le statut de retour
  const handleUpdateRental = (id: string, returned: boolean) => {
    const rental = rentals.find((rental) => rental._id === id);
    if (rental) {
      setRentalToUpdate({ ...rental, returned });
      setShowUpdatePopup(true);
    }
  };

  // Confirme et met à jour le statut de retour de la location
  const confirmUpdateRental = async (updatedRental: Rental) => {
    try {
      await updateRentalStatus(updatedRental._id, updatedRental.returned);
      setRentals(
        rentals.map((rental) =>
          rental._id === updatedRental._id ? updatedRental : rental,
        ),
      );
      setMessage("Statut de la location mis à jour avec succès.");
      setIsSuccess(true);
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du statut de la location.");
      setIsSuccess(false);
    } finally {
      setShowUpdatePopup(false);
      setRentalToUpdate(null);
    }
  };

  // Confirme et supprime la location
  const confirmDeleteRental = async () => {
    if (rentalToDelete) {
      try {
        await deleteRental(rentalToDelete._id);
        setRentals(rentals.filter((r) => r._id !== rentalToDelete._id));
        setMessage("La location a été supprimée avec succès.");
        setIsSuccess(true);
      } catch (error) {
        setMessage("Erreur lors de la suppression de la location.");
        setIsSuccess(false);
      } finally {
        setShowConfirmPopup(false);
        setRentalToDelete(null);
      }
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Gestion des Locations</h1>
      <RentalList
        rentals={rentals}
        onDeleteRental={handleDeleteRental}
        onUpdateStatus={handleUpdateRental} // Utiliser handleUpdateRental pour le statut
        onShowDetails={handleShowDetails}
      />

      {/* Modal de confirmation pour la suppression */}
      {showConfirmPopup && rentalToDelete && (
        <ConfirmActionPopup
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer cette location ?"
          onConfirm={confirmDeleteRental}
          onCancel={() => setShowConfirmPopup(false)}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
        />
      )}

      {/* Modal de détails */}
      {showDetailsPopup && rentalToShow && (
        <RentalDetails
          rental={rentalToShow}
          onClose={() => setShowDetailsPopup(false)}
        />
      )}

      {/* Modal de mise à jour pour le statut de retour */}
      {showUpdatePopup && rentalToUpdate && (
        <RentalUpdate
          rental={rentalToUpdate}
          onUpdate={confirmUpdateRental}
          onCancel={() => setShowUpdatePopup(false)}
        />
      )}

      {/* Modal de message */}
      {message && (
        <MessageModal
          message={message}
          isSuccess={isSuccess}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
};

export default RentalPage;
