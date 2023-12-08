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















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const ProductManage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [subCategories, setSubCategories] = useState([]);

//   const validationSchema = Yup.object().shape({
//     image: Yup.mixed().required('Imagen es requerida'),
//     category: Yup.string().required('Categoría es requerida'),
//     subCategory: Yup.string().when('category', {
//       is: (val) => val !== 'Ninguna',
//       then: Yup.string().required('Subcategoría es requerida'),
//       otherwise: Yup.string(),
//     }),
//     name: Yup.string().required('Nombre de artículo es requerido'),
//     material: Yup.string().required('Material es requerido'),
//     description: Yup.string().required('Descripción es requerida'),
//     color: Yup.string().required('Color es requerido'),
//     dimensions: Yup.string().required('Dimensiones es requerido'),
//     quantity: Yup.number()
//   .typeError('La cantidad debe ser un número')
//   .required('Cantidad es requerida')
//   .min(1, 'La cantidad debe ser al menos 1'),


//   });

//   const formik = useFormik({
//     initialValues: {
//       image: '',
//       category: '',
//       subCategory: '',
//       name: '',
//       material: '',
//       description: '',
//       color: '',
//       dimensions: '',
//       quantity: 0,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
     
//       console.log(values);
//       try {
//         const formData = new FormData();
//         formData.append('image', values.image);
//         formData.append('category', values.category);
//         formData.append('subCategory', values.subCategory);
//         formData.append('name', values.name);
//         formData.append('material', values.material);
//         formData.append('description', values.description);
//         formData.append('color', values.color);
//         formData.append('dimensions', values.dimensions);
//         formData.append('quantity', values.quantity);

//         const response = await axios.post('http://localhost:4000/api/v1/product/add', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log('Product added successfully:', response.data);
//       } catch (error) {
//         console.error('Error adding product:', error.message);
//       }
//     },
//   });

//   const categories = [
//     "AIRE_LIBRE", "ALFOMBRAS", "BAZAR", "CESTERIA", "COMERCIAL", "DE_MANO", "DECO", "DEPORTES", "ESCOLAR",
//     "OFICINA", "HOGAR_Y_JARDIN", "INFANTIL", "LAMPARAS", "LECTURA_Y_MUSICA", "MARROQUINERIA", "PARED",
//     "VIA_PUBLICA", "RELIGIOSO", "RELOJES", "SALUD", "TECNO", "TELEFONOS", "TEXTIL", "TOCADOR",
//   ];

//   const subcategories = {
//     AIRE_LIBRE: ["PICNIC", "CAMPING", "PLAYA"],
//     ALFOMBRAS: [],
//     // ... (Add subcategories for other categories)
//   };

//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     const categorySubcategories = subcategories[selectedCategory] || [];

//     setSelectedCategory(selectedCategory);
//     formik.setFieldValue('subCategory', ''); // Reset subCategory when category changes
//     setSubCategories(categorySubcategories.length > 0 ? categorySubcategories : ["Ninguna"]);
//   };

//   return (
//     <div className="flex items-center justify-center pt-[17vh]">
//       <form onSubmit={formik.handleSubmit} className="bg-white p-8 shadow-md rounded max-w-md w-full">
//         <div className="mb-3 flex items-center">
//           <label htmlFor="image" className="w-1/3 pr-4 text-right">
//             Imagen:
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             name="image"
//             onChange={(event) => formik.setFieldValue('image', event.target.files[0])}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.image && formik.touched.image && (
//             <div className="text-red-500">{formik.errors.image}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="category" className="w-1/3 pr-4 text-right">
//             Categoría:
//           </label>
//           <select
//             name="category"
//             value={formik.values.category}
//             onChange={(event) => {
//               formik.handleChange(event);
//               handleCategoryChange(event);
//             }}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           >
//             {!selectedCategory && (
//               <option value="" disabled>Selecciona una categoría</option>
//             )}
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           {formik.errors.category && formik.touched.category && (
//             <div className="text-red-500">{formik.errors.category}</div>
//           )}
//         </div>

//         {selectedCategory && (
//           <div className="mb-3 flex items-center">
//             <label htmlFor="subCategory" className="w-1/3 pr-4 text-right">
//               Sub-categoría:
//             </label>
//             <select
//               name="subCategory"
//               value={formik.values.subCategory}
//               onChange={formik.handleChange}
//               className="w-2/3 p-2 border border-gray-300 rounded"
//             >
//               {!subCategories.includes("Ninguna") && (
//                 <option value="">Selecciona una subcategoría</option>
//               )}
//               {subCategories.map((subCategory) => (
//                 <option key={subCategory} value={subCategory}>
//                   {subCategory}
//                 </option>
//               ))}
//             </select>
//             {formik.errors.subCategory && formik.touched.subCategory && (
//               <div className="text-red-500">{formik.errors.subCategory}</div>
//             )}
//           </div>
//         )}

//         <div className="mb-3 flex items-center">
//           <label htmlFor="name" className="w-1/3 pr-4 text-right">
//             Nombre de artículo:
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.name && formik.touched.name && (
//             <div className="text-red-500">{formik.errors.name}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="material" className="w-1/3 pr-4 text-right">
//             Material:
//           </label>
//           <input
//             type="text"
//             name="material"
//             value={formik.values.material}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.material && formik.touched.material && (
//             <div className="text-red-500">{formik.errors.material}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="description" className="w-1/3 pr-4 text-right">
//             Descripción:
//           </label>
//           <textarea
//             name="description"
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.description && formik.touched.description && (
//             <div className="text-red-500">{formik.errors.description}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="color" className="w-1/3 pr-4 text-right">
//             Color:
//           </label>
//           <input
//             type="text"
//             name="color"
//             value={formik.values.color}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.color && formik.touched.color && (
//             <div className="text-red-500">{formik.errors.color}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="dimensions" className="w-1/3 pr-4 text-right">
//             Dimensiones:
//           </label>
//           <input
//             type="text"
//             name="dimensions"
//             value={formik.values.dimensions}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.dimensions && formik.touched.dimensions && (
//             <div className="text-red-500">{formik.errors.dimensions}</div>
//           )}
//         </div>

//         <div className="mb-3 flex items-center">
//           <label htmlFor="quantity" className="w-1/3 pr-4 text-right">
//             Cantidad:
//           </label>
//           <input
//             type="number"
//             name="quantity"
//             value={formik.values.quantity}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-2/3 p-2 border border-gray-300 rounded"
//           />
//           {formik.errors.quantity && formik.touched.quantity && (
//             <div className="text-red-500">{formik.errors.quantity}</div>
//           )}
//         </div>

//         <div className="mt-4 flex justify-center">
//           <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
//             AGREGAR
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductManage;







