import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManage from "./components/ProductManage";
import Rubros from "./components/Rubros";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/inicio" element={<ProductManage />} />
        <Route path="/rubros" element={<Rubros />} />
      </Routes>
    </>
  );
};

export default App;
