import React from "react";
import { Link } from "react-router-dom";

const CardsRubros = ({ products, modalOpen,handleModal }) => {
  return (

    <div className="grid grid-cols-3 gap-4 mr-6">
      {products.map((item, i) => (
        <Link to={`?id=${item._id}`} key={i}>
        <img
        onClick={handleModal}
          
          className=" w-[470px] h-[280px] rounded-md "
          src={`data:image/jpeg;base64,${item.image}`}
          alt={item.name}
        />
        </Link>
      ))}

    </div>
  );
};

export default CardsRubros;
