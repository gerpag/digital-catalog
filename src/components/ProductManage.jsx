import React, { useState } from 'react';

const ProductManage = () => {
  // const [image, setImage] = useState(null);
  // const [category, setCategory] = useState('');
  // const [subCategory, setSubCategory] = useState('');
  // const [name, setName] = useState('');
  // const [material, setMaterial] = useState('');
  // const [description, setDescription] = useState('');
  // const [color, setColor] = useState('');
  // const [dimensions, setDimensions] = useState('');
  // const [quantity, setQuantity] = useState('');
  
  
  //CONFIG con MODEls

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      image,
      category,
      subCategory,
      name,
      material,
      description,
      color,
      dimensions,
      quantity,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded max-w-md w-full">
        <div className="mb-3 flex items-center">
          <label htmlFor="image" className="w-1/3 pr-4 text-right">
            Imagen:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="category" className="w-1/3 pr-4 text-right">
            Categoría:
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="subCategory" className="w-1/3 pr-4 text-right">
            Sub-categoría:
          </label>
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="name" className="w-1/3 pr-4 text-right">
            Nombre de artículo:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="material" className="w-1/3 pr-4 text-right">
            Material:
          </label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="description" className="w-1/3 pr-4 text-right">
            Descripción:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="color" className="w-1/3 pr-4 text-right">
            Color:
          </label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="dimensions" className="w-1/3 pr-4 text-right">
            Dimensiones:
          </label>
          <input
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="quantity" className="w-1/3 pr-4 text-right">
            Cantidad:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            AGREGAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductManage;
