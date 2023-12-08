import React from "react";
import { Link } from "react-router-dom";

function Footer(){

    return(

        <div className="h-[10vh] w-full mt-[5vh] flex items-center justify-center ">
            <div className="w-[85%]">
            <p className=" text-[1.15rem] font-sans "> <span className="font-semibold">POLIRUBRO</span> Utilería en alquiler. Todos los derechos reservados. Copyright 2023. Ciudad Autónoma de Buenos Aires, Argentina. <Link to="terminos-y-condiciones"><span className=" text text-blue-700 underline">Términos y Condiciones</span></Link></p>
            </div>
        </div>
    )
}

export default Footer