import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManage from "./components/ProductManage";
import Rubros from "./components/Rubros";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/agregar" element={<ProductManage />} />
        <Route path="/rubros" element={<Rubros/>} />
      </Routes>
    </>
  );
};

export default App;
