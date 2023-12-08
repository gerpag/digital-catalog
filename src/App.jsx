import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductManage from "./components/ProductManage";
import Rubros from "./components/Rubros";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Info from "./components/Info";
import Contacto from "./components/Contacto";
import Footer from "./components/footer";
import HamburguerMenu from "./commons/HamburgerMenu";


const App = () => {


  const [modalOpen,setModalOpen]=useState(false)
  const handleModal=()=>{
    setModalOpen(!modalOpen)
  }


  return (
    <>
      <NavBar handleModal={handleModal} modal={modalOpen} />
      {modalOpen && <HamburguerMenu handleModal={handleModal} modal={modalOpen}/>}
      <Routes>
        <Route path="/" element={<Home modal={modalOpen}/>} />
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
