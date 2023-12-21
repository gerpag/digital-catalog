import React, { useState } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  arrayProductosConDataImagen,
  ordenProductosCarrusel,
} from "../assets/auxiliarFunctions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

function ProductModal({ modalOpen, handleModal }) {
  const navigate = useNavigate();
  const adminLogged = useSelector(
    (state) => state.user.userData?.payload.is_admin
  );
  const [productInfo, setProductInfo] = useState({});
  const [productsCarrusel, setProductCarrusel] = useState([]);
  const [index, setIndex] = useState(0);

  const carruselMoveRight = () => {
   
    if (index < productsCarrusel.length - 1) {
      setIndex(index + 1);
    }
  };
  const carruselMoveLeft = () => {
   
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const id = useLocation().search.split("=")[1];

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
          const productosConImagenesOrdenados = ordenProductosCarrusel(
            productosConImagenes,
            id
          );
          setProductCarrusel(productosConImagenesOrdenados);
          setIndex(0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const [modalDelete, setModalDelete] = useState(false);
  const handleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleDelete = () => {
    if (productsCarrusel.length > 1) {
      let newIndex;
      if (index + 1 === productsCarrusel.length) {
        newIndex = index - 1;
      } else {
        newIndex = index + 1;
      }
      axios
        .delete(
          `http://localhost:4000/api/v1/product/erase/${productsCarrusel[index]._id}`
        )
        .then(() => {
          axios.delete(
            `http://localhost:4000/api/v1/images/${productsCarrusel[index].url_img}`
          );
        })
        .then(() => {
          navigate(`?id=${productsCarrusel[newIndex]._id}`);
        });
    }
    if (productsCarrusel.length === 1) {
      axios
        .delete(
          `http://localhost:4000/api/v1/product/erase/${productsCarrusel[index]._id}`
        )
        .then(() => {
          axios.delete(
            `http://localhost:4000/api/v1/images/${productsCarrusel[index].url_img}`
          );
        })
        .then(() => {
          navigate("/rubros");
          handleModal();
        });
    }
    handleModalDelete();
    toast.success("Producto Eliminado");
  };

  return (
    <>
      {modalOpen && productInfo.name && (
        <>
          <DeleteModal
            handleModalDelete={handleModalDelete}
            modalDelete={modalDelete}
            handleDelete={handleDelete}
          />
          <div
            className={`${
              modalDelete
                ? "opacity-50 brightness-50 pointer-events-none bg-black "
                : "bg-[#f2f2f2] "
            }h-[90vh] w-[40vw] fixed top-[5%] left-[30%] z-40 rounded-md`}
          >
            <div className="w-full flex justify-end">
              <Link to={`/rubros`}>
                <FaTimes
                  onClick={() => {
                    handleModal();
                    setProductCarrusel([]);
                  }}
                  style={{ marginRight: "1%", fontSize: "1.5rem" }}
                />
              </Link>
            </div>

            {productsCarrusel.length > 0 && (
              <div className="w-[90%] h-[85%] mx-auto">
                <p className="text-[1.3rem] mb-[2%]">
                  {`${productsCarrusel[index].name} (${productsCarrusel[index].dimensions})`.toUpperCase()}
                </p>
                {adminLogged && (
                  <FaTrash
                    onClick={handleModalDelete}
                    className="tachitoBasura"
                  />
                )}
                <img
                  src={`data:image/jpeg;base64,${productsCarrusel[index].image}`}
                  className="w-full h-full object-fit object-center  inset-0  transition-transform duration-1000 rounded-md"
                />
              </div>
            )}
          </div>
          {!modalDelete && (
            <>
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
      )}
    </>
  );
}

export default ProductModal;
