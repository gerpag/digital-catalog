import React, { useState } from "react";
import poliRubroLogo from "/polirubro_logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const NavBar = ({ handleModal, modal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector(
    (state) => state.user.userData?.payload.is_admin || false
  );

  const links = ["INICIO", "RUBROS", "INFO", "CONTACTO"];

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleScreenWidth);

  const modalOpen = useSelector((state) => state.modal);

  const handleLogOut = () => {
    axios
      .get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then(() => {
        dispatch(setUserData(null));
        document.cookie =
          "adminSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div
        className={`${
          (modal || modalOpen) && "opacity-50 brightness-50 pointer-events-none"
        }  flex w-[100vw] h-[16vh]  fixed z-40 justify-center bg-[#f2f2f2] items-center`}
      >
        {screenWidth >= 1024 ? (
          <div className="flex h-[100%] w-[100%] justify-around">
            <div className="h-full flex items-center mr-[5%] ">
              <img
                src={poliRubroLogo}
                alt="Logo Polirubro"
                className="h-[80%]"
              />
            </div>
            <div className="flex items-center">
              <ul className="flex ml-[5%] list-non w-[60vw] justify-between items-center ">
                {links.map((item, index) => (
                  <li key={index} className="justify-center text-2xl">
                    <Link
                      to={
                        item === "INICIO" ? "/" : `/${item.toLocaleLowerCase()}`
                      }
                      className={`hover:font-bold ${
                        location.pathname === `/${item.toLocaleLowerCase()}`
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}

                {isAdmin && (
                  <li className="justify-center text-2xl">
                    <Link
                      to="/agregar"
                      className={`hover:font-bold ${
                        location.pathname === "/agregar" ? "font-bold" : ""
                      }`}
                    >
                      AGREGAR
                    </Link>
                  </li>
                )}

                {isAdmin ? (
                  <li
                    onClick={handleLogOut}
                    className="justify-center text-2xl hover:font-bold"
                  >
                    LOGOUT
                  </li>
                ) : (
                  <li className="justify-center text-2xl">
                    <Link
                      to="/login"
                      className={`hover:font-bold ${
                        location.pathname === "/login" ? "font-bold" : ""
                      }`}
                    >
                      LOGIN
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="h-full flex items-center ml-[5%] invisible ">
              <img
                src={poliRubroLogo}
                alt="Logo Polirubro"
                className="h-[80%]"
              />
            </div>
          </div>
        ) : (
          !modal && (
            <div className="flex h-[70%] w-[85%] justify-between items-center">
              <div className="h-full flex items-center ml-2% ">
                <img
                  src={poliRubroLogo}
                  alt="Logo Polirubro"
                  className="h-[80%]"
                />
              </div>

              <FaBars
                onClick={handleModal}
                style={{ fontSize: "1.5rem", marginRight: "2%" }}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default NavBar;
