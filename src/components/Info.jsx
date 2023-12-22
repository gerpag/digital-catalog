import React from 'react';

const Info = () => {
  return (
    <div className="polirubro-container flex items-center justify-center  bg-gray-100 m pt-[17vh] ">
      <div className="text-left p-4  mx-auto w-[100vh]">
        
        <p className="text-3xl mb-4 w-[100vh]">
          <span className="font-bold">POLIRUBRO PROPS</span> es un rental de utilería enfocado en el medio audiovisual y escénico, cine, tv, publicidad, fotografía, teatro. Nace de la idea de circular objetos encontrados y atesorados durante años de trabajo en arte, facilitando el scouting de utilería de acción y ambientación, en un vasto catálogo online de productos de diferentes épocas, nacionales e importados.
        </p>

        <h3 className="text-3xl font-bold mb-2">Alquilar es sencillo:</h3>
        <ol className="list-decimal list-inside mb-4 text-3xl w-[100vh]">
          <li>Mándanos un mail a  <a href="mailto:polirubroprops@gmail.com"> <span className='text text-blue-700 ' >polirubroprops@gmail.com</span></a>  con la selección de utilería que te interesa; indicando fechas, productora y nombre del proyecto.</li>
          <li>Te enviamos un presupuesto con validez de 7 días.</li>
          <li>Nos confirmas el pedido para reservarlo, aceptando los <a target="_blank" href='http://localhost:5174/terminos-y-condiciones' ><span className="text text-blue-700 underline">Términos y Condiciones</span></a> de alquiler.</li>
          <li>Retiran según cita previa, dejando garantía por el total.</li>
        </ol>
      </div>
    </div>
  );
};

export default Info;

