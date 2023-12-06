import React from "react";
import poliRubroLogo from "/polirubro_logo.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ isAdminLoggedIn }) => {
  const location = useLocation();
  const links = ["INICIO", "RUBROS", "INFO", "CONTACTO", "AGREGAR"];

  return (
    <div className="flex w-[100vw] h-[16vh] mb-[2vh] ">
      <div className="h-full flex items-center ml-[1%] ">
        <img
          src={poliRubroLogo}
          alt="Logo Polirubro"
          className="h-[80%]"
        />
      </div>
      <div className="flex items-center ml-42  ">
        <ul className="flex ml-[5%] list-non w-[60vw] justify-between items-center">
          {links.map((item, index) => (
            <li key={index} className="justify-center text-2xl">
              <Link
                to={item==="INICIO"? "/":`/${item.toLocaleLowerCase()}`}
                className={`hover:font-bold ${
                  location.pathname === `/${item.toLocaleLowerCase()}` ? "font-bold" : ""
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

