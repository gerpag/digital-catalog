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
    "aire_libre",
    "alfombras",
    "bazar_cocina",
    "cesteria",
    "comercial",
    "de_mano",
    "deco",
    "deportes",
    "escolar",
    "oficina_escritorio",
    "hogar_jardin",
    "infantil",
    "lamparas",
    "lectura_musica",
    "marroquineria",
    "pared",
    "via_publica",
    "religioso",
    "relojes",
    "salud",
    "tecno_electro",
    "telefonos",
    "textil",
    "tocador",
];
const subcategories = {
  aire_libre: ["picnic ,camping ,playa"],
  alfombras: [],
  bazar_cocina: ["bar", "botellas/jarras", "cubiertos/utensillos", "electro (tostadoras, licuadoras, jugueras, cafetera electrica, multipro)", "especieros", "frascos / latas", "fruteras / paneras", "fuentes / bandejas", "infusiones (te mate cafe, desayuno)", "ollas / sartenes", "tablas / apoyas", "termos", "vajilla", "vasos / copas", "varios bazar", "productos (packagins)"],
  cesteria: [],
  comercial: ["productos y packagins", "comercial varios"],
  de_mano: ["agendas / libretas", "anteojos", "billeteras / monederos", "bijou", "bolsillo / cartera(polveras, espejitos, guantes, pañuelos, pastilleros, peines, algún maquillaje, abanicos)", "dinero / documentos", "llaves / llaveros / candados", "neceseurs", "paraguas", "tabaco (cigarillos, mecheros, cigarreras, etc)", "viaje (automovil, mapas, pasajes aeropuerto, etc)"],
  deco: ["cajas / cofres", "ceniceros", "floreros / jarrones", "navidad / cotillon", "firguras / objetos", "platos / bandejas", "portaretratos", "souvenirs / colecciones", "velas / candelabros"],
  deportes: [],
  escolar: ["aula", "carpetas y cuadernos", "mochilas / portafolios", "utiles"],
  oficina_escritorio: ["archivo", "mesa", "papeleria", "tecno (compus, maquina escribir, calculadoras)"],
  hogar_jardin: ["miscelanea y mobiliario"],
  infantil: ["decoracion", "juguetes", "juegos de mesa", "instrumentos", "muñecos / peluches / titeres", "sillas / rodados"],
  lamparas: ["mesa", "techo", "pared"],
  lectura_musica: ["libros / revistas", "discos / cintas"],
  marroquineria: ["bolsos / mochilas", "carteras", "escolar / infantil", "equipaje", "portafolios"],
  pared: ["cuadros", "diplomas", "espejos","laminas", "mascaras", "mapas / planos", "placas / carteleria", "platos", "tapices", "varios (calendarios, esterillas, grillas, especiero, etc"],
  via_publica: ["patentes, escudos, señaletica"],
  religioso: [],
  relojes: ["mesa", "pared"],
  salud: ["medicina", "farmacia"],
  tecno_electro: ["electrodomesticos", "audio", "tecnologia"],
  telefonos: [],
  textil: ["acolachados/mantas", "almohadones", "carpetas/caminos", "cortinas", "manteles/individuales", "repasadores/manoplas", "sabanas", "toallas"],
  tocador: ["aseo", "cosmetica", "frascos / perfumes", "hombre", "peluqueria", "varios tocador o baño"],
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















