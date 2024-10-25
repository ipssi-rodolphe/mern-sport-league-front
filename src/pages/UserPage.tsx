import React, { useEffect, useState } from "react";
import ListUser from "../components/User/ListUser";
import MessageModal from "../components/MessageModal";
import ConfirmActionPopup from "../components/ConfirmActionPopup";
import { fetchUsers, toggleAccountStatus } from "../api/userApi";
import { User } from "../types/User";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);

  // Chargement initial des utilisateurs
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (error) {
        setMessage("Erreur lors du chargement des utilisateurs.");
        setIsSuccess(false);
      }
    };
    loadUsers();
  }, []);

  // Ouvre le popup de confirmation pour activer/désactiver un utilisateur
  const handleToggleAccountStatus = (
    userId: string,
    currentStatus: boolean,
  ) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setUserToToggle({ ...user, accountAccepted: currentStatus });
      setShowConfirmPopup(true);
    }
  };

  // Confirme et effectue l'activation/désactivation de l'utilisateur
  const confirmToggleAccountStatus = async () => {
    if (userToToggle) {
      try {
        await toggleAccountStatus(
          userToToggle._id,
          !userToToggle.accountAccepted,
        );
        setUsers(
          users.map((user) =>
            user._id === userToToggle._id
              ? { ...user, accountAccepted: !user.accountAccepted }
              : user,
          ),
        );
        setMessage("Le statut de l'utilisateur a été mis à jour avec succès.");
        setIsSuccess(true);
      } catch (error) {
        setMessage(`Erreur lors de la mise à jour du statut de l'utilisateur.`);
        setIsSuccess(false);
      } finally {
        setShowConfirmPopup(false);
        setUserToToggle(null);
      }
    }
  };

  // Gestion de la fermeture du MessageModal
  const handleCloseMessage = () => setMessage(null);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Gestion des Utilisateurs</h1>
      <ListUser
        users={users}
        onToggleAccountStatus={handleToggleAccountStatus} // Passe handleToggleAccountStatus
      />

      {/* Modal de confirmation */}
      {showConfirmPopup && userToToggle && (
        <ConfirmActionPopup
          title="Confirmer l'action"
          message={`Êtes-vous sûr de vouloir ${
            userToToggle.accountAccepted ? "bloquer" : "activer"
          } l'utilisateur ${userToToggle.firstName} ${userToToggle.name} ?`}
          onConfirm={confirmToggleAccountStatus}
          onCancel={() => setShowConfirmPopup(false)}
          confirmLabel={userToToggle.accountAccepted ? "Bloquer" : "Activer"}
          cancelLabel="Annuler"
        />
      )}

      {/* Affichage du modal de message */}
      {message && (
        <MessageModal
          message={message}
          isSuccess={isSuccess}
          onClose={handleCloseMessage}
        />
      )}
    </div>
  );
};

export default UserPage;
