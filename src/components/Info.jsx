import React from 'react';

const Info = () => {
  return (
    <div className="polirubro-container flex items-center justify-center  bg-gray-100  pt-[17vh]">
      <div className="text-left p-4 max-w-2xl mx-auto">
        
        <p className="text-3xl mb-4">
          <span className="font-bold">POLIRUBRO PROPS</span> es un rental de utilería para el medio audiovisual y escénico, cine, tv, publicidad, fotografía, teatro. Nace de la idea de circular objetos encontrados y atesorados durante años de trabajo en arte, facilitando el scouting de utilería de acción y ambientación, en un vasto catálogo online de productos de diferentes épocas, nacionales e importados.
        </p>

        <h3 className="text-3xl font-bold mb-2">Alquilar es sencillo:</h3>
        <ol className="list-decimal list-inside mb-4 text-3xl ">
          <li>Mándanos por mail la selección de utilería que te interesa.</li>
          <li>Te enviamos un presupuesto.</li>
          <li>Nos confirmas el pedido.</li>
          <li>Retiran según cita previa, dejando garantía por el total.</li>
        </ol>
      </div>
    </div>
  );
};

export default Info;

