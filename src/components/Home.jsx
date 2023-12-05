import React from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function Home(){


    return(<>
   
        <div className="w-[94vw] grid grid-cols-5 gap-3 mx-[auto] ">
    {rubros.map((categoria,i)=>{
       return (
    <CardCategory categoria={categoria}/>
       )
    })}
    </div>
  
    </>)
}

export default Home;