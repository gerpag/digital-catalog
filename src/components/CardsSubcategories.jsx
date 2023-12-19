import React from "react";
import { Link } from "react-router-dom";


const CardsSubcategorias = ({ subcategorias, visibleSubcategorias, handleToggleSubcategoria }) => {
    
        return (
    <ul>
      {Object.keys(subcategorias).map((item, index) => (
        <div key={index}>
          <div
            onClick={() => handleToggleSubcategoria(item)}
            className="cursor-pointer"
          >
            <li className={`text-base mt-1 ${visibleSubcategorias[item] ? 'font-bold' : ''}`}>
              {item.toUpperCase()}
            </li>
          </div>
          <ul>{visibleSubcategorias[item] && renderSubcategorias(subcategorias[item])}</ul>
        </div>
      ))}
    </ul>
  );
};

const renderSubcategorias = (subcategoriaList) => {
  return subcategoriaList.map((subcategory, index) => (
    <Link key={index} to="/rubros">
      <li className="text-base mt-1 ml-4">{subcategory.toUpperCase()}</li>
    </Link>
  ));
};

export default CardsSubcategorias;
