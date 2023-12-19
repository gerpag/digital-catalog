import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { arrayProductosConDataImagen } from "../assets/auxiliarFunctions";

function ProductModal({ modalOpen, handleModal }) {
  const [productInfo, setProductInfo] = useState({});
  const [productsCarrusel, setProductCarrusel] = useState([]);
  const [move, setMove] = useState(false);
  const [index, setIndex] = useState(0);

  const carruselMoveRight = () => {
    setMove(true);
    if (index < productsCarrusel.length - 1) {
      setIndex(index + 1);
    }
  };
  const carruselMoveLeft = () => {
    setMove(true);
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const id = useLocation().search.split("=")[1];
  console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const productView = await axios.get(
            `http://localhost:4000/api/v1/product/search?_id=${id}`
          );
          let dataProducto = productView.data[0];

          const imageProductView = await axios.get(
            `http://localhost:4000/api/v1/images/${dataProducto.url_img}`
          );
          dataProducto = {
            ...dataProducto,
            imageData: imageProductView.data.imageData,
          };

          setProductInfo(dataProducto);

          const productosCarrusel = await axios.get(
            `http://localhost:4000/api/v1/product/search?category=${dataProducto.category}`
          );
          const productos_url = productosCarrusel.data.map(
            (product) => product.url_img
          );

          let infoImagenesServer = await axios.get(
            `http://localhost:4000/api/v1/images/?imagenes=${productos_url}`
          );
          let imagenes = infoImagenesServer.data.images;

          const productosConImagenes = arrayProductosConDataImagen(
            productosCarrusel.data,
            imagenes
          );
          setProductCarrusel(productosConImagenes);
          console.log("imagenes=============>", imagenes);
          console.log("dataProducto=============>", dataProducto);
          console.log("productos=============>", productosConImagenes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {modalOpen && productInfo.name && (
        <>
          <div className="bg-[#f2f2f2] h-[90vh] w-[40vw] fixed top-[5%] left-[30%] z-40 rounded-md">
            <div onClick={()=>{handleModal();setMove(false);setProductInfo({})}} className="w-full flex justify-end">
              <Link to={`/rubros`}>
                <FaTimes style={{ marginRight: "1%", fontSize: "1.5rem" }} />
              </Link>
            </div>
            {!move ? (
              <div className="w-[90%] h-[85%] mx-auto">
                <p className="text-[1.3rem] mb-[2%]">
                  {`${productInfo.name} (${productInfo.dimensions})`.toUpperCase()}
                </p>
                <img
                  src={`data:image/jpeg;base64,${productInfo.imageData}`}
                  className="w-full h-full object-fit object-center  inset-0  transition-transform duration-1000 rounded-md"
                />
              </div>
            ) : (
              <>
                {productsCarrusel.length > 0 && (
                  <div className="w-[90%] h-[85%] mx-auto">
                    <p className="text-[1.3rem] mb-[2%]">
                      {`${productsCarrusel[index].name} (${productsCarrusel[index].dimensions})`.toUpperCase()}
                    </p>
                    <img
                      src={`data:image/jpeg;base64,${productsCarrusel[index].image}`}
                      className="w-full h-full object-fit object-center  inset-0  transition-transform duration-1000 rounded-md"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <FaChevronLeft
            onClick={carruselMoveLeft}
            className="leftArrowCarrusel"
          />
          <FaChevronRight
            onClick={carruselMoveRight}
            className="rightArrowCarrusel"
          />
        </>
      )}
    </>
  );
}

export default ProductModal;
