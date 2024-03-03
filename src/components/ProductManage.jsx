import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductManage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
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
    "bazar_y_cocina",
    "cesteria",
    "comercial",
    "de_mano",
    "deco",
    "deportes",
    "escolar",
    "oficina_y_escritorio",
    "hogar_y_jardin",
    "infantil",
    "lamparas",
    "lectura_y_musica",
    "marroquineria",
    "pared",
    "via_publica",
    "religioso",
    "relojes",
    "salud",
    "tecno_y_electro",
    "telefonos",
    "textil",
    "tocador",
  ];
  const subcategories = {
    aire_libre: ["picnic_camping_playa"],
    alfombras: [],
    bazar_y_cocina: [
      "bar",
      "botellas_jarras",
      "cubiertos_utensillos",
      "electro (tostadoras_licuadoras_jugueras_cafetera_electrica_multipro)",
      "especieros",
      "frascos_latas",
      "fruteras_paneras",
      "fuentes_bandejas",
      "infusiones(te_mate_cafe_desayuno)",
      "ollas_sartenes",
      "tablas_apoyas",
      "termos",
      "vajilla",
      "vasos_copas",
      "varios_bazar",
      "productos(packagins)",
    ],
    cesteria: [],
    comercial: ["productos_y_packagins", "comercial_varios"],
    de_mano: [
      "agendas_libretas",
      "anteojos",
      "billetera_monederos",
      "bijou",
      "bolsillo_cartera(polveras_espejitos_guantes_pañuelos_pastilleros_peines_maquillaje_abanicos)",
      "dinero_documentos",
      "llaves_llaveros_candados",
      "neceseurs",
      "paraguas",
      "tabaco(cigarillos_mecheros_cigarreras_etc)",
      "viaje(automovil_mapas_pasajes_de_aeropuerto_etc)",
    ],
    deco: [
      "cajas_cofres",
      "ceniceros",
      "floreros_jarrones",
      "navidad_cotillon",
      "firguras_objetos",
      "platos_bandejas",
      "portaretratos",
      "souvenirs_colecciones",
      "velas_candelabros",
    ],
    deportes: [],
    escolar: [
      "aula",
      "carpetas_y_cuadernos",
      "mochilas_portafolios",
      "utiles",
    ],
    oficina_y_escritorio: [
      "archivo",
      "mesa",
      "papeleria",
      "tecno(compus_maquina_de_escribir_calculadoras)",
    ],
    hogar_y_jardin: ["miscelanea_y_mobiliario"],
    infantil: [
      "decoracion",
      "juguetes",
      "juegos_de_mesa",
      "instrumentos",
      "muñecos_peluches_titeres",
      "sillas_rodados",
    ],
    lamparas: ["mesa", "techo", "pared"],
    lectura_y_musica: ["libros_revistas", "discos_cintas"],
    marroquineria: [
      "bolsos_mochilas",
      "carteras",
      "escolar_infantil",
      "equipaje",
      "portafolios",
    ],
    pared: [
      "cuadros",
      "diplomas",
      "espejos",
      "laminas",
      "mascaras",
      "mapas_planos",
      "placas_carteleria",
      "platos",
      "tapices",
      "varios(calendarios_esterillas_grillas_especiero_etc)",
    ],
    via_publica: ["patentes_escudos_señaletica"],
    religioso: [],
    relojes: ["mesa", "pared"],
    salud: ["medicina", "farmacia"],
    tecno_y_electro: ["electrodomesticos", "audio", "tecnologia"],
    telefonos: [],
    textil: [
      "acolachados_mantas",
      "almohadones",
      "carpetas_caminos",
      "cortinas",
      "manteles_individuales",
      "repasadores_manoplas",
      "sabanas",
      "toallas",
    ],
    tocador: [
      "aseo",
      "cosmetica",
      "frascos_perfumes",
      "hombre",
      "peluqueria",
      "varios_tocador_baño",
    ],
  };
  

  const validationSchema = Yup.object({
    image: Yup.mixed().required("La imagen es requerida"),
    category: Yup.string().required("La categoría es requerida"),
    subCategory: Yup.string(),

    name: Yup.string().required("El nombre es requerido"),
    material: Yup.string().required("El material es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    colour: Yup.string().required("El color es requerido"),
    dimensions: Yup.string().required("Las dimensiones son requeridas"),
    quantity: Yup.number()
      .required("La cantidad es requerida")
      .positive("La cantidad debe ser un número positivo"),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      category: "",
      subCategory: "",
      name: "",
      material: "",
      description: "",
      colour: "",
      dimensions: "",
      quantity: 0,
      url_img: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const trimmedCategory = values.category.trim();
        const trimmedSubcategory = values.subCategory.trim();
        
        const formdata = new FormData();
        // Object.keys(values).forEach((key) => {
        //   formdata.append(key, values[key]);
        // });
        Object.keys(values).forEach((key) => {
          if (key === "category") {
            formdata.append(key, trimmedCategory);
          } else if (key === "subCategory") {
            formdata.append(key, trimmedSubcategory);
          } else {
            formdata.append(key, values[key]);
          }
        });
        const response = await axios.post(
          "http://localhost:4000/api/v1/product/add",
          formdata
        );

        toast.success("Artículo agregado exitosamente");

        resetForm();
        document.getElementById("image").value = null;
      } catch (error) {
        const errDup = error.response.data.error.split(" ")[0];
        console.error("Error adding product:", error.message);

        if (errDup === "E11000") {
          toast.error("EL nombre del artículo ya existe, debe ser diferente");
        } else if (error.response && error.response.data) {
          console.error("Error adding product:", error.response.data.error);
          toast.error("Error al agregar el producto");
        } else {
          console.error("Error adding product:", error.message);
          toast.error("Error al agregar el producto");
        }
      }
    },
  });

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const categorySubcategories = subcategories[selectedCategory] || [];

    setSelectedCategory(selectedCategory);

    formik.setFieldValue("category", selectedCategory);
    formik.setFieldValue("subCategory", "");

    setSubCategories(
      categorySubcategories.length > 0 ? categorySubcategories : ["Ninguna"]
    );
  };

  return (
    <div className="flex items-center justify-center pt-[17vh]">
      <form
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 shadow-md rounded max-w-md w-full"
      >
        <div className="mb-3 flex items-center">
          <label htmlFor="image" className="w-1/3 pr-4 text-right">
            Imagen:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            name="image"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
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
            onChange={(event) => {
              handleCategoryChange(event);
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            className="w-2/3 p-2 border border-gray-300 rounded"
          >
            {!formik.values.category && (
              <option value="" disabled>
                Selecciona una categoría
              </option>
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
                <option value="" disabled>
                  Selecciona una subcategoría
                </option>
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
            <option value="" disabled>
              Selecciona un color
            </option>
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
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            AGREGAR
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductManage;
