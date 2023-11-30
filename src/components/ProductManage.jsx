import React, { useState } from 'react';

const ProductManage = () => {
  
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [quantity, setQuantity] = useState('');

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Sub-category:
          <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
          Dimensions:
          <input type="text" value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default ProductManage;
