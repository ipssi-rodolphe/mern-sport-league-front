import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./layouts/Wrapper";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import UserPage from "./pages/UserPage";
import RentalPage from "./pages/RentalPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProtectedRoute from "./layouts/ProtectedRoute";
import CategoryManager from "./components/Category/Categorymanager";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />

          <Route
            path="products"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProductsPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="rental"
            element={
              <ProtectedRoute requiredRole="admin">
                <RentalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute requiredRole="admin">
                <CategoryManager />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
