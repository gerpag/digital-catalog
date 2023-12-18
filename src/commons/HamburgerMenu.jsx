import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import poliRubroLogo from "/polirubro_logo.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function HamburguerMenu({ handleModal, modal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector(
    (state) => state.user.userData?.payload.is_admin || false
  );
  const userLogged = useSelector((state) => state.user.userData?.payload.email);
  const links = ["INICIO", "RUBROS", "INFO", "CONTACTO"];

  const [activo, setActivo] = useState(false);

  const handleActivo = () => {
    return activo
      ? (setActivo(!activo), setTimeout(() => handleModal(), 1000))
      : setActivo(!activo);
  };

  useEffect(() => {
    handleActivo();
  }, [modal]);

  const handleLogOut = () => {
    axios
      .get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then(() => {
        dispatch(setUserData(null))
        navigate("/");
      })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div
      className={`${
        activo ? "translate-x-0" : "translate-x-full"
      } fixed w-[60vw] h-[100vh] top[17vh]  z-50 bg-[#f2f2f2] border-[2px] border-[grey] right-0 ease-in-out transform transition-transform duration-1000`}
    >
      <div onClick={handleActivo} className="w-full flex justify-start mt-[2%]">
        <FaTimes style={{ marginLeft: "5%", fontSize: "1.5rem" }} />
      </div>

      <div className="h-[15vh] w-full flex items-center justify-center ml-2% border-b-[1px] border-[grey]">
        <img src={poliRubroLogo} alt="Logo Polirubro" className="h-[75%]" />
      </div>

      <ul className="flex flex-col list-none w-[100%] justify-around items-center h-1/2 mt-[5vh]">
        {links.map((item, index) => (
          <div key={index} className="w-[80%]">
            <li className="text-[1.1rem] text-center ">
              <Link
                to={item === "INICIO" ? "/" : `/${item.toLocaleLowerCase()}`}
                className={`hover:font-bold ${
                  location.pathname === `/${item.toLocaleLowerCase()}`
                    ? "font-bold"
                    : ""
                }`}
              >
                {item}
              </Link>
            </li>
          </div>
        ))}
        {isAdmin && (
          <div className="w-[80%]">
            <li className="text-[1.1rem] text-center ">
              <Link
                to={`/agregar`}
                className={`hover:font-bold ${
                  location.pathname === `/agregar` ? "font-bold" : ""
                }`}
              >
                AGREGAR
              </Link>
            </li>
          </div>
        )}
        {userLogged ? (
          <li
            onClick={handleLogOut}
            className="text-[1.1rem] text-center hover:font-bold "
          >
            LOGOUT
          </li>
        ) : (
          <li className="text-[1.1rem] text-center ">
            <Link
              to={`/login`}
              className={`hover:font-bold ${
                location.pathname === `/login` ? "font-bold" : ""
              }`}
            >
              LOGIN
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default HamburguerMenu;
