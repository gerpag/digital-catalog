import React from 'react';
import axios from 'axios';

const ProductManage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    try {
      const response = await axios.post('http://localhost:4000/api/v1/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded max-w-md w-full">
        <div className="mb-3 flex items-center">
          <label htmlFor="image" className="w-1/3 pr-4 text-right">
            Imagen:
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="category" className="w-1/3 pr-4 text-right">
            Categoría:
          </label>
          <input
            type="text"
            name="category"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="subCategory" className="w-1/3 pr-4 text-right">
            Sub-categoría:
          </label>
          <input
            type="text"
            name="subCategory"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="name" className="w-1/3 pr-4 text-right">
            Nombre de artículo:
          </label>
          <input
            type="text"
            name="name"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="material" className="w-1/3 pr-4 text-right">
            Material:
          </label>
          <input
            type="text"
            name="material"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="description" className="w-1/3 pr-4 text-right">
            Descripción:
          </label>
          <textarea
            name="description"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="color" className="w-1/3 pr-4 text-right">
            Color:
          </label>
          <input
            type="text"
            name="color"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="dimensions" className="w-1/3 pr-4 text-right">
            Dimensiones:
          </label>
          <input
            type="text"
            name="dimensions"
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="quantity" className="w-1/3 pr-4 text-right">
            Cantidad:
          </label>
          <input
            type="number"
            name="quantity"
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




