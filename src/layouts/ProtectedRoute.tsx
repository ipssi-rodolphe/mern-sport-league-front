// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

// Type d'objet User que vous stockez
interface User {
  role: string;
}

// Fonction pour récupérer l'utilisateur depuis le localStorage
const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Composant ProtectedRoute
interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const user = getUserFromLocalStorage();

  // Vérifie si l'utilisateur est connecté et a le rôle requis
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
