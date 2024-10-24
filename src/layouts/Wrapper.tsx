import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Wrapper: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto rounded-md bg-white p-4 shadow-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default Wrapper;
