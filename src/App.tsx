import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./layouts/Wrapper";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
