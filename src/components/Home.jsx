import React from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function Home(){


    return(<>
   
        <div className="w-[85vw] grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 xs:w-3/4 gap-3 mx-[auto] pt-[17vh]  ">
    {rubros.map((categoria,i)=>{
       return (
    <CardCategory categoria={categoria}/>
       )
    })}
    </div>
  
    </>)
}

export default Home;