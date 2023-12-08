import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsRubros from "./CardsRubros";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rubros = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const colorParam = queryParams.get("color");
  const categoryParam = queryParams.get("cat");

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productsFetch = async () => {
      try {
        let url = "http://localhost:4000/api/v1/product/search";

        if (colorParam) {
          url += `?colour=${colorParam}`;
        }
        if (categoryParam) {
          url += `${colorParam ? "&" : "?"}category=${categoryParam}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("No se pudo cargar los productos:", error);
      }
    };

    productsFetch();
  }, [colorParam, categoryParam]);

  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      const searchTermLower = searchTerm?.toLowerCase();
      const searchTermsArray = searchTermLower.split(" ");

      return searchTermsArray.every(
        (term) =>
          product.name?.toLowerCase().includes(term) ||
          product.colour?.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(updatedFilteredProducts);
  }, [searchTerm, products]);

  const handleColor = async (color) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/search?colour=${color}`
      );

      setProducts(response.data);

      const newSearch = `?color=${color}${
        categoryParam ? `&cat=${categoryParam}` : ""
      }`;
      navigate({
        search: newSearch,
      });
    } catch (error) {
      console.error("no se pudo cargar un color", error);
    }
  };

  const handleCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/search?category=${category}`
      );
      setProducts(response.data);
      const newSearch = `?cat=${category}${
        colorParam ? `&color=${colorParam}` : ""
      }`;
      navigate({
        search: newSearch,
      });
    } catch (error) {
      console.error("no se pudo cargar un color", error);
    }
  };
  const handleResetFilterColor = () => {
    const searchParams = new URLSearchParams(location.search);

    if (colorParam) {
      searchParams.delete("color");
    }

    navigate({
      search: searchParams.toString(),
    });
  };
  const handleResetFilterCategory = () => {
    const searchParams = new URLSearchParams(location.search);

    if (categoryParam) {
      searchParams.delete("cat");
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  const colorsOne = [
    { titulo: "blanco", color: "#FFFFFF" },
    { titulo: "beige", color: "#F5F5DC" },
    { titulo: "amarillo", color: "#F4E057" },
    { titulo: "marron", color: "#8B4513" },
    { titulo: "naranja", color: "#FFA500" },
    { titulo: "rojo", color: "#B7352D" },
    { titulo: "turquesa", color: "#40E0D0" },
    { titulo: "celeste", color: "#B0E0E6" },
    { titulo: "bordo", color: "#800000" },
    { titulo: "crudo", color: "#DCD0C0" },
  ];
  const colorsTwo = [
    { titulo: "rosa", color: "#FFC0CB" },
    { titulo: "violeta", color: "#800080" },
    { titulo: "azul", color: "#314B98" },
    { titulo: "verde", color: "#76A360" },
    { titulo: "gris", color: "#808080" },
    { titulo: "plateado", color: "#C0C0C0" },
    { titulo: "dorado", color: "#FFD700" },
    { titulo: "transparente", color: "#000000" },
    { titulo: "negro", color: "#000000" },
    { titulo: "multicolor", color: "#000000" },
  ];

  const categories = [
    "aire libre",
    "alfombras",
    "bazar",
    "cesteria",
    "comercial",
    "de mano",
    "deco",
    "deporte",
    "escolar",
    "oficina",
    "hogar y jardin",
    "infantil",
    "lamparas",
    "lectura y musica",
    "marroquineria",
    "pared",
    "publica",
    "religioso",
    "relojes",
    "salud",
    "tecno",
    "telefonos",
    "textil",
    "tocador",
  ];

  return (
    <div>
      <div className="general flex ml-12 pt-[17vh]">
        <div className="izquierda w-36 mr-32">
          <div>
            <h3 className="text-xl font-bold mb-3">Colores</h3>
            <div>
              <div>
                {colorsOne.map((item, index) => (
                  <button
                    key={index}
                    className=" w-5 h-5 m-1 rounded-full"
                    style={{ backgroundColor: item.color }}
                    onClick={() => handleColor(item.titulo)}
                  />
                ))}
              </div>
              <div>
                {colorsTwo.map((item, index) => (
                  <button
                    key={index}
                    className={"w-5 h-5 m-1 rounded-full"}
                    style={{ backgroundColor: item.color }}
                    onClick={() => handleColor(item.titulo)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="categorias ">
            <h3 className="text-xl font-bold mb-3 mt-3">Categorías</h3>
            <ul>
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to="/rubros"
                  className="hover:font-bold "
                  onClick={() => handleCategory(item)}
                >
                  <li className=" text-base mt-1">{item.toUpperCase()}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="derecha ">
          <div className="flex">
            <input
              type="text"
              className=" border-b-2 border-black mb-3 bg-transparent outline-none"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex">
              {categoryParam && (
                <button
                  onClick={handleResetFilterCategory}
                  className="border-[1px] bg-gray-200 rounded-xl w-auto px-2 mx-2 hover:bg-gray-300 "
                >
                  {categoryParam.toUpperCase()}
                  <span
                    className=" ml-3 text-black font-bold  "
                    onClick={handleResetFilterCategory}
                  >
                    x
                  </span>
                </button>
              )}
              {colorParam && (
                <button
                  onClick={handleResetFilterColor}
                  className="border-[1px] bg-gray-200 rounded-xl w-auto mx-2 px-2 hover:bg-gray-300 relative"
                >
                  {colorParam.toUpperCase()}
                  <span
                    className=" ml-3 text-black font-bold "
                    onClick={handleResetFilterColor}
                  >
                    x
                  </span>
                </button>
              )}
            </div>
          </div>
          <CardsRubros products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Rubros;
