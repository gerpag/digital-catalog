
import React, { useState } from 'react';

const ProductManage = () => {

  const [imagen, setImagen] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [material, setMaterial] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [color, setColor] = useState('');
  const [medidas, setMedidas] = useState('');
  const [cantidad, setCantidad] = useState('');

  
  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log({
      imagen,
      categoria,
      nombre,
      material,
      descripcion,
      color,
      medidas,
      cantidad,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Imagen:
          <input type="file" accept="image/*" onChange={handleImagenChange} />
        </label>
      </div>
      <div>
        <label>
          Categoría:
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Material:
          <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Color:
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Medidas:
          <input type="text" value={medidas} onChange={(e) => setMedidas(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
};

export default ProductManage;
