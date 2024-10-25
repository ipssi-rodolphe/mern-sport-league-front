import React, { useState, useEffect } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // État pour les données de connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Gérer le changement dans les formulaires
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Gérer l'envoi du formulaire de connexion
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      console.log("Utilisateur connecté:", response);

      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("authToken", response.token);
      
      // Mettre à jour l'état de connexion
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  // Utiliser useEffect pour surveiller l'état de connexion et effectuer des actions
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.email) {
      setIsLoggedIn(true);
    }
  }, []);

  // Rediriger vers la page des produits après une connexion réussie
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/products"); // Redirige vers la page des produits
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter
        </h2>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleLoginSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
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
              value={loginData.password}
              onChange={handleLoginChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
