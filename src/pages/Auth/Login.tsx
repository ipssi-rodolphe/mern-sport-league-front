import React from "react";
import Login from '../../components/LoginForm' // Assurez-vous de mettre le bon chemin pour le composant Login

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter
        </h2> */}
        <Login />
        <div className="text-center mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Vous n'avez pas de compte ? Créez-en un
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
