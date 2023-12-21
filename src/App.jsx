import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductManage from "./components/ProductManage";
import Rubros from "./components/Rubros";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Info from "./components/Info";
import Contacto from "./components/Contacto";
import Footer from "./components/footer";
import Forbidden from "./components/Forbbiden";
import HamburguerMenu from "./commons/HamburgerMenu";
import Login from "./components/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "../redux/reducers";

const App = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const isAdmin = useSelector(
    (state) => state.user.userData?.payload.is_admin || false
  );

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
    <ToastContainer />
      <NavBar handleModal={handleModal} modal={modalOpen} />
      {modalOpen && (
        <HamburguerMenu handleModal={handleModal} modal={modalOpen} />
      )}
      <Routes>
        <Route path="/" element={<Home modal={modalOpen} />} />

        {isAdmin ? (
          <Route path="/agregar" element={<ProductManage />} />
        ) : (
          <Route path="/agregar" element={<Forbidden />} />
        )}

        <Route path="/rubros" element={<Rubros />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
