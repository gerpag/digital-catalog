import React from "react";
import { Link } from "react-router-dom";
import CardsRubros from "./CardsRubros";
const Rubros = () => {
  const colorsOne = [
    { titulo: "blanco", color: "#FFFFFF" },
    { titulo: "beige", color: "#F5F5DC" },
    { titulo: "amarillo", color: "#F4E057" },
    { titulo: "marron", color: "#8B4513" },
    { titulo: "naranja", color: "#FFA500" },
    { titulo: "rojo", color: "#B7352D" },
  ];
  const colorsTwo = [
    { titulo: "rosa", color: "#FFC0CB" },
    { titulo: "morado", color: "#800080" },
    { titulo: "azul", color: "#314B98" },
    { titulo: "verde", color: "#76A360" },
    { titulo: "gris", color: "#808080" },
    { titulo: "negro", color: "#000000" },
  ];
  const category = [
    "TODOS",
    "UNO",
    "DOS",
    "TRES",
    "CUATRO",
    "CINCO",
    "SEIS",
    "SIETE",
    "OCHO",
    "NUEVE",
    "DIEZ",
    "ONCE",
    "DOCE",
    "TRECE",
    "CATORCE",
    "QUINCE",
    "DIECISÉIS",
    "DIECISIETE",
    "DIECIOCHO",
    "DIECINUEVE",
    "VEINTE",
    "VEINTIUNO",
    "VEINTIDÓS",
    "VEINTITRÉS",
    "VEINTICUATRO",
    "VEINTICINCO",
    "VEINTISÉIS",
  ];

  return (
    <div>
      <div className="general flex ml-20 pt-[17vh]">
        <div className="izquierda w-60">
          <div className=" ">
            <h3 className="text-xl font-bold mb-3">Colores</h3>
            <div className="">
              <div>
                {colorsOne.map((item, index) => (
                  <button
                    key={index}
                    className=" w-5 h-5 m-1 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
              <div>
                {colorsTwo.map((item, index) => (
                  <button
                    key={index}
                    className=" w-5 h-5 m-1 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="categorias ">
            <h3 className="text-xl font-bold mb-3">Categorías</h3>
            <ul>
              {category.map((item, index) => (
                <Link key={index} to="/rubros" className="hover:font-bold ">
                  <li className=" text-base mt-1">{item}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="derecha ">
          <CardsRubros />
        </div>
      </div>
    </div>
  );
};

export default Rubros;
