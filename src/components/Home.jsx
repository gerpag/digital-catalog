import React, { useEffect, useState } from "react";
import { rubros } from "../assets/categorias";
import CardCategory from "../commons/CardCategory";

function Home({ modal }) {
  return (
    <>
      <div
        className={`${
          modal && "opacity-50 brightness-50 pointer-events-none bg-black "
        } h-full w-full`}
      >
        <div
          className={` w-[85vw] grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xs:w-3/4 gap-3 mx-[auto] pt-[17vh] `}
        >
          {rubros.map((category, i) => {
            return <CardCategory key={i} category={category} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
