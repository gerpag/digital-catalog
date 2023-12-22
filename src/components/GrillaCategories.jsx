import React from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function GrillaCategories({modal}){
  

    return(<>
   
   <div className={`${modal && "opacity-50 brightness-50 pointer-events-none bg-black "} h-full w-full`}>
        <div className={` grid   lg:grid-cols-3 mr-6  sm:grid-cols-3 xs:grid-cols-2 xs:w-3/4 gap-3  pt-[17vh] `}>
    {rubros.map((categoria,i)=>{
       return (
    <CardCategory key={i} categoria={categoria}/>
       )
    })}
    </div>
    
    </div>
    
    </>)
}

export default GrillaCategories;