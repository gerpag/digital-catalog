import React, { useEffect, useState } from "react";
import poliRubroLogo from "/polirubro_logo.png";
import { Link, useLocation } from "react-router-dom";
import {FaBars } from "react-icons/fa";


const NavBar = ({ isAdminLoggedIn }) => {
  const location = useLocation();
  const links = ["INICIO", "RUBROS", "INFO", "CONTACTO", "AGREGAR","LOGIN"];

  const [screenWidth,setScreenWidth]=useState(window.innerWidth)


  const handleScreenWidth=()=>{
    setScreenWidth(window.innerWidth)
  }

  window.addEventListener("resize",handleScreenWidth)


  return (
    <>
    <div className="  flex w-[100vw] h-[16vh]  fixed z-50 justify-center bg-[#f2f2f2] items-center ">

      {screenWidth>=1024 ? 
       
      (<div class="flex h-[100%] w-[85%] justify-start">
      
      <div className="h-full flex items-center ">
        <img
          src={poliRubroLogo}
          alt="Logo Polirubro"
          className="h-[80%]"
        />
      </div>
      <div className="flex items-center ">
        <ul className="flex ml-[5%] list-non w-[60vw] justify-between items-center ">
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
      </div>):(<div class="flex h-[70%] w-[85%] justify-between items-center">   
        <div className="h-full flex items-center ml-2% ">
        <img
          src={poliRubroLogo}
          alt="Logo Polirubro"
          className="h-[80%]"
        />
      </div>

      <FaBars style={{fontSize:"1.5rem", marginRight:"2%"}}/>

         </div>)}
    </div>
    </>
  );
};

export default NavBar;

