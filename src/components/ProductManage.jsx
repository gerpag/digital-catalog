import React, {useState} from 'react';
import axios from 'axios';

const ProductManage = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);


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


  const categories = [
  "AIRE_LIBRE",
  "ALFOMBRAS",
  "BAZAR",
  "CESTERIA",
  "COMERCIAL",
  "DE_MANO",
  "DECO",
  "DEPORTES",
  "ESCOLAR",
  "OFICINA",
  "HOGAR_Y_JARDIN",
  "INFANTIL",
  "LAMPARAS",
  " LECTURA_Y_MUSICA",
  "MARROQUINERIA",
  "PARED",
  "VIA_PUBLICA",
  "RELIGIOSO",
  "RELOJES",
  "SALUD",
  "TECNO",
  "TELEFONOS",
  "TEXTIL",
  "TOCADOR",
];
const subcategories = {
  AIRE_LIBRE: ["PICNIC","CAMPING", "PLAYA"],
  ALFOMBRAS: [],
  BAZAR: ["BAR","BOTELLAS", "JARRAS", "CUBIERTOS","UTENSILLOS", "CONDIMENTEROS",
    "ELECTRO (TOSTADORAS, LICUADORAS, JUGUERAS, CAFETERA ELECTRICA, MULTIPRO)",
    "FRASCOS / LATAS",
    "FRUTERAS / PANERAS", 
    "FUENTES / BANDEJAS", "INFUSIONES (TE MATE CAFE, DESAYUNO)", 
    "OLLAS / SARTENES",
    "TABLAS / APOYAS",
    "TERMOS", 
    "VAJILLA",
    "VASOS / COPAS",
    "VARIOS BAZAR",
    "PRODUCTOS (packagins)"
    ],
  CESTERIA: [],
  COMERCIAL: [],
  DE_MANO: ["AGENDAS / LIBRETAS", "ANTEOJOS", "BILLETERAS / MONEDEROS", "BIJOU", "BOLSILLO / CARTERA(polveras, espejitos, guantes, pañuelos, pastilleros, peines, algún maquillaje, abanicos)","DINERO / DOCUMENTOS", "LLAVES / LLAVEROS / CANDADOS","NECESEURS", "PARAGUAS", "TABACO (CIGARILLOS, MECHEROS, cigarreras, ETC)","VIAJE (automovil, mapas, pasajes aeropuerto, etc)"],
  DECO: ["CAJAS / COFRES", "CENICEROS", "FLOREROS / JARRONES", "NAVIDAD . COTILLON", "OBJETOS", "PLATOS / BANDEJAS", "PORTARETRATOS", "SOUVENIRS / COLECCIONES", "VELAS / CANDELABROS"],
  DEPORTES: [],
  ESCOLAR: ["AULA", "CARPETAS Y CUADERNOS", "MOCHILAS / PORTAFOLIOS", "UTILES"],
  OFICINA: ["ARCHIVO","MESA", "PAPELERIA", "TECNO (compus, maquina escribir, calculadoras)"],
  HOGAR_Y_JARDIN: [],
  INFANTIL: ["DECORACION", "JUGUETES", "JUEGOS DE MESA", "INSTRUMENTOS", "MUÑECOS / PELUCHES / TITERES","SILLAS / RODADOS"],
  LAMPARAS: ["MESA", "TECHO", "PARED"],
  LECTURA_Y_MUSICA: ['LECTURA Y MUSICA Subcategory1', 'LECTURA Y MUSICA Subcategory2'],
  MARROQUINERIA: ["BOLSOS / MOCHILAS", "CARTERAS","ESCOLAR / INFANTIL", "EQUIPAJE", "PORTAFOLIOS"],
  PARED: ["CUADROS", "DIPLOMAS / CALENDARIOS","ESPEJOS", "MASCARAS", "MAPAS / PLANOS", "PLACAS / CARTELERIA", "PLATOS", "TAPICES"],
  VIA_PUBLICA: ["PATENTES", "ESCUDOS", "SEÑALETICA"],
  RELIGIOSO: [],
  RELOJES: ["MESA", "PARED"],
  SALUD: ["MEDICINA", "FARMACIA"],
  TECNO: ["ELECTRODOMÉSTICOS", "AUDIO", "TECNOLOGÍA"],
  TELEFONOS: [],
  TEXTIL: [],
  TOCADOR: ["ASEO", "COSMETICA", "FRASCOS / PERFUMES", "HOMBRE", "PELUQUERÍA", "VARIOS TOCADOR o BAÑO"],
};

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const categorySubcategories = subcategories[selectedCategory] || [];
    
    setSelectedCategory(selectedCategory);
    setSubCategories(categorySubcategories.length > 0 ? categorySubcategories : ["Ninguna"]);
  };

  return (
    <div className="flex items-center justify-center pt-[17vh]">
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
        <select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-2/3 p-2 border border-gray-300 rounded"
        >
          
          
          {!selectedCategory && (
            <option value="" disabled>Selecciona una categoría</option>
          )}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-3 flex items-center">
          <label htmlFor="subCategory" className="w-1/3 pr-4 text-right">
            Sub-categoría:
          </label>
          <select
            name="subCategory"
            className="w-2/3 p-2 border border-gray-300 rounded"
          >
          
            {!subCategories.includes("Ninguna") && (
              <option value="" >Selecciona una subcategoría</option>
            )}
            {subCategories.map((subCategory) => 
            (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
      )}

      
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




