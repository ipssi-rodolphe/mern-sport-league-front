import React, { useState } from "react";
import { registerUser } from "../api/authApi"; // Assurez-vous de mettre le bon chemin pour authApi.ts

const Register: React.FC = () => {
  // État pour les données d'enregistrement
  const [registerData, setRegisterData] = useState({
    firstName: "",
    name: "",
    email: "",
    password: "",
  });

  // Gérer le changement dans les formulaires
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Gérer l'envoi du formulaire d'enregistrement
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(registerData);
      console.log("Utilisateur enregistré:", response);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegisterSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={handleRegisterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Prénom"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Nom"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            S'enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
