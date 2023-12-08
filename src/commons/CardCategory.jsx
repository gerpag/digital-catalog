import React from "react";
import { Link } from "react-router-dom";

function CardCategory({ categoria }) {
  return (
    <Link to={`rubros/?cat=${categoria.categoria}`}>
      <div className="h-[52vh] w-[100%] relative  overflow-hidden">
        <p className="text-[white] text-[1.7rem] relative top-[50%] text-center font-sans font-semibold z-10">
          {categoria.categoria}
        </p>
        <img
          src={categoria.url_img}
          className="w-full h-full  object-fit object-left-bottom  absolute inset-0 hover:scale-[1.2] transition-transform duration-3000 hover:opacity-70 transition-filter  duration-5000 hover:brightness-50"
        />
      </div>
    </Link>
  );
}

export default CardCategory;
