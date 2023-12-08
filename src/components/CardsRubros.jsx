import React from "react";

const CardsRubros = ({ products }) => {
  return (

    <div className="grid grid-cols-3 gap-3 ">
      {products.map((item, i) => (
        <img
          key={i}
          className=" w-[470px] h-[280px] rounded-lg "
          src={item.url_img}
          alt={item.name}
        />
      ))}

    </div>
  );
};

export default CardsRubros;
