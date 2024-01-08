import React from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function GrillaCategories({ modal }) {
  return (
    <div className="w-[85%] grid lg:grid-cols-4 sm:w-[85%] sm:grid-cols-3 xs:w-[85%]  gap-3 ">
      {rubros.map((categoria, i) => {
        return <CardCategory key={i} categoria={categoria} />;
      })}
    </div>
  );
}

export default GrillaCategories;
