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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />

          <Route path="users" element={<UserPage />} />
          <Route path="rental" element={<RentalPage />} />
          {/* <ProtectedRoute requiredRole="admin">
            <Route path="users" element={<UserPage />} />
          </ProtectedRoute> */}

          <Route
            path="products"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProductsPage />
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
