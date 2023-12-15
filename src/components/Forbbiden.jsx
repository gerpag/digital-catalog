import React from 'react';

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-4 max-w-2xl mx-auto">
        <h1 className="text-8xl mb-4">Error 403</h1>
        <h3 className="text-5xl mb-2">Acceso Prohibido</h3>
        <p className="text-3xl mb-4">
          No tenés permisos para acceder a esta página o recurso.
        </p>
      </div>
    </div>
  );
};

export default Forbidden;

