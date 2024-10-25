import React from "react";
import Register from "../../components/RegisterForm"; // Assurez-vous de mettre le bon chemin pour le composant Register

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2> */}
        <Register />
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Vous avez déjà un compte ? Connectez-vous
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
