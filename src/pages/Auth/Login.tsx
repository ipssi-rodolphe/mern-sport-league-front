import React from "react";
import Login from '../../components/LoginForm' // Assurez-vous de mettre le bon chemin pour le composant Login

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
          {/* Demo Login Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Connexion Démo
          </h3>
          <p className="text-sm text-gray-700 font-semibold mt-2">
            Utilisez les identifiants suivants pour une connexion de démonstration :
          </p>
          <div className="mt-3">
            <p className="font-medium text-gray-800">Email (demo admin) :</p>
            <p className="text-sm text-gray-700 mb-2">frederic.zai@gmail.com</p>
            <p className="font-medium text-gray-800">Mot de passe :</p>
            <p className="text-sm text-gray-700">test123</p>
          </div>
          
          <div className="mt-3">
            <p className="font-medium text-gray-800">Email (demo user) :</p>
            <p className="text-sm text-gray-700 mb-2">jean.dupont1@example.com</p>
            <p className="font-medium text-gray-800">Mot de passe :</p>
            <p className="text-sm text-gray-700">Password123!</p>
          </div>
          <p className="text-sm text-red-700 mt-2">
          ⚠️ Please reload the page when you're loggedIn !!⚠️
          </p>
        </div>
        <Login />
        <div className="text-center ">
          <a href="/register" className="text-blue-500 hover:underline">
            Vous n'avez pas de compte ? Créez-en un
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
