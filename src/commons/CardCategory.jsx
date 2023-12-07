import React from "react";
import { Link } from "react-router-dom";

function CardCategory({categoria}){

    return(
        <Link to={`rubros/?category=${categoria.categoria}`}>
        <div className="aspect-square relative  overflow-hidden">
            <p className="text-[white]  lg:text-[1.7rem] md:text-[1.4rem] xs:text-[1.7rem]  relative top-[50%] text-center font-sans font-semibold z-10">{categoria.categoria}</p>
            <img src={categoria.url_img} className="w-full h-full object-fit object-left-bottom  absolute inset-0 hover:scale-[1.2] transition-transform duration-1000 hover:opacity-70 transition-filter hover:brightness-50"/>
        </div>
        </Link>
    )
}

export default CardCategory