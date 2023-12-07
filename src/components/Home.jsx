import React from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function Home(){


    return(<>
   
        <div className="w-[85vw] grid grid-cols-4 gap-3 mx-[auto] pt-[17vh] ">
    {rubros.map((categoria,i)=>{
       return (
    <CardCategory categoria={categoria}/>
       )
    })}
    </div>
  
    </>)
}

export default Home;