import React from "react";
import poliRubroLogo from "/polirubro_logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const links = ["INICIO", "RUBROS", "INFO", "CONTACTO"];

  return (
    <div className="flex ">
      <div>
        <img
          src={poliRubroLogo}
          alt="Logo Polirubro"
          className="w-24 h-24 m-6 ml-12"
        />
      </div>
      <div className="flex items-center ml-42 ">
        <ul className=" flex list-none ">
          {links.map((item, index) => (
            <li key={index} className=" ml-36 mt-6 justify-center text-2xl ">
              <Link
                to={`/${item.toLocaleLowerCase()}`}
                className="hover:font-bold"
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
