import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductModal({ modalOpen, handleModal }) {
  const [productInfo, setProductInfo] = useState({});

  const id = useLocation().search.split("=")[1];
  console.log("id", id);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/v1/product/search?_id=${id}`)
        .then((response) => {
          let dataProducto=response.data[0];
          setProductInfo(dataProducto)
          axios.get(`http://localhost:4000/api/v1/images/${dataProducto.url_img}`)
          .then((image)=>{
            setProductInfo({...dataProducto,imageData:image.data.imageData})
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      {modalOpen && productInfo.name &&  (
        <div className="bg-[#f2f2f2] h-[90vh] w-[40vw] fixed top-[5%] left-[30%] z-40 rounded-md">
          <div
            onClick={handleModal}
            className="w-full flex justify-end"
          >
            <Link to={`/rubros`}>
            <FaTimes style={{ marginRight: "1%", fontSize: "1.5rem" }} />
            </Link>
          </div>
          <div className="w-[90%] h-[85%] mx-auto">
            <p className="text-[1.3rem] mb-[2%]">{(`${productInfo.name} (${productInfo.dimensions})`.toUpperCase())}</p>
          <img src={`data:image/jpeg;base64,${productInfo.imageData}`} className="w-full h-full object-fit object-center  inset-0  transition-transform duration-1000 rounded-md"/>

          </div>

        </div>
      )}
    </>
  );
}

export default ProductModal;
