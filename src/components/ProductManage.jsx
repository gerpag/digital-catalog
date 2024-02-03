import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductManage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  

    const colours = [
    "amarillo",
    "verde",
    "turquesa",
    "celeste",
    "azul",
    "naranja",
    "rojo",
    "bordó",
    "violeta",
    "rosa",
    "blanco",
    "crudo",
    "beige",
    "marrón (ladrillo/madera)", 
    "plateado",
    "dorado",
    "negro",
    "gris",
    "transparente",
    "multicolor",
  ];
  
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

  const validationSchema = Yup.object({
    image: Yup.mixed().required('La imagen es requerida'),
    category: Yup.string().required('La categoría es requerida'),
    subCategory: Yup.string(),
    
    name: Yup.string().required('El nombre es requerido'),
    material: Yup.string().required('El material es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    colour: Yup.string().required('El color es requerido'),
    dimensions: Yup.string().required('Las dimensiones son requeridas'),
    quantity: Yup.number().required('La cantidad es requerida').positive('La cantidad debe ser un número positivo'),
  });

  const formik = useFormik({
    initialValues: {
      image: '',
      category: '',
      subCategory: '',
      name: '',
      material: '',
      description: '',
      colour: '',
      dimensions: '',
      quantity: 0,
      url_img:"" 
    },
    validationSchema,
    onSubmit: async (values,  { resetForm }) => {
      try {
        const formdata = new FormData();
       
        
        Object.keys(values).forEach((key) => {
          formdata.append(key, values[key]);
        });

        const response = await axios.post('/api/v1/product/add', formdata);
     
      toast.success('Artículo agregado exitosamente');

      resetForm();
      document.getElementById('image').value = null;

      } catch (error) {
        const errDup = error.response.data.error.split(" ")[0];
        console.error('Error adding product:', error.message);
       
        if (errDup === "E11000") {
          toast.error("EL nombre del artículo ya existe, debe ser diferente")
          
         
        } else if (error.response && error.response.data) {
          console.error('Error adding product:', error.response.data.error);
          toast.error('Error al agregar el producto');
        } else {
          console.error('Error adding product:', error.message);
          toast.error("Error al agregar el producto");
        }
      }
    },
  });

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const categorySubcategories = subcategories[selectedCategory] || [];
    
    setSelectedCategory(selectedCategory);

    formik.setFieldValue('category', selectedCategory);
    formik.setFieldValue('subCategory', ''); 

    setSubCategories(categorySubcategories.length > 0 ? categorySubcategories : ["Ninguna"]);


  };


  return (
    <div className="flex items-center justify-center pt-[17vh]">
      <form encType="multipart/form-data" onSubmit={formik.handleSubmit} className="bg-white p-8 shadow-md rounded max-w-md w-full">
        <div className="mb-3 flex items-center">
          <label htmlFor="image" className="w-1/3 pr-4 text-right">
            Imagen:
          </label>
          <input
            id=  'image'
            type="file"
            accept="image/*"
            name="image"
            onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500">{formik.errors.image}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="category" className="w-1/3 pr-4 text-right">
            Categoría:
          </label>
          <select
            name="category"
            value={formik.values.category}
            onChange={(event) => { handleCategoryChange(event); formik.handleChange(event); }}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          >
            {!formik.values.category && (
              <option value="" disabled>Selecciona una categoría</option>
            )}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>

        {selectedCategory && (
          <div className="mb-3 flex items-center">
            <label htmlFor="subCategory" className="w-1/3 pr-4 text-right">
              Sub-categoría:
            </label>
            <select
              name="subCategory"
              value={formik.values.subCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-2/3 p-2 border border-gray-300 rounded"
            >
              {!subCategories.includes("Ninguna") && (
                <option value="" disabled>Selecciona una subcategoría</option>
              )}
              {subCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            {formik.touched.subCategory && formik.errors.subCategory ? (
              <div className="text-red-500">{formik.errors.subCategory}</div>
            ) : null}
          </div>
        )}

        <div className="mb-3 flex items-center">
          <label htmlFor="name" className="w-1/3 pr-4 text-right">
            Nombre de artículo:
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="material" className="w-1/3 pr-4 text-right">
            Material:
          </label>
          <input
            type="text"
            name="material"
            value={formik.values.material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.material && formik.errors.material ? (
            <div className="text-red-500">{formik.errors.material}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="description" className="w-1/3 pr-4 text-right">
            Descripción:
          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="colour" className="w-1/3 pr-4 text-right">
            Color:
          </label>
          <select
            name="colour"
            value={formik.values.colour}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Selecciona un color</option>
            {colours.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          {formik.touched.colour && formik.errors.colour ? (
            <div className="text-red-500">{formik.errors.colour}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="dimensions" className="w-1/3 pr-4 text-right">
            Dimensiones:
          </label>
          <input
            type="text"
            name="dimensions"
            value={formik.values.dimensions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.dimensions && formik.errors.dimensions ? (
            <div className="text-red-500">{formik.errors.dimensions}</div>
          ) : null}
        </div>

        <div className="mb-3 flex items-center">
          <label htmlFor="quantity" className="w-1/3 pr-4 text-right">
            Cantidad:
          </label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-red-500">{formik.errors.quantity}</div>
          ) : null}
        </div>

        <div className="mt-4 flex justify-center">
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            AGREGAR
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductManage;




