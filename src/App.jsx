import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManage from "./components/ProductManage";
import Rubros from "./components/Rubros";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Info from "./components/Info";
import Contacto from "./components/Contacto";
import Footer from "./components/footer";


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/agregar" element={<ProductManage />} />
        <Route path="/rubros" element={<Rubros />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
