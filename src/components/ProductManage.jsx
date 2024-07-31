import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { rubros, colours } from "../assets/categorias";

const ProductManage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const categories = rubros.map((rubro) => rubro.category);
  const subcategoriesMap = rubros.reduce((acc, rubro) => {
    acc[rubro.category] = rubro.subcategories;
    return acc;
  }, {});

  const validationSchema = Yup.object({
    image: Yup.mixed().required("La imagen es requerida"),
    category: Yup.array().of(Yup.string()).required("La categoría es requerida"),
    subCategory: Yup.array().of(Yup.string()),
    name: Yup.string().required("El nombre es requerido"),
    material: Yup.string().required("El material es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    colour: Yup.array().of(Yup.string()).required("El color es requerido"),
    dimensions: Yup.string().required("Las dimensiones son requeridas"),
    quantity: Yup.number().required("La cantidad es requerida").positive("La cantidad debe ser un número positivo"),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      category: [],
      subCategory: [],
      name: "",
      material: "",
      description: "",
      colour: [],
      dimensions: "",
      quantity: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formdata = new FormData();
        Object.keys(values).forEach((key) => {
          if (Array.isArray(values[key])) {
            values[key].forEach((value, index) => {
              formdata.append(`${key}[${index}]`, value);
            });
          } else {
            formdata.append(key, values[key]);
          }
        });

        await axios.post("http://localhost:4000/api/v1/product/add", formdata);
        toast.success("Artículo agregado exitosamente");
        resetForm();
        document.getElementById("image").value = null;
      } catch (error) {
        const errDup = error.response.data.error.split(" ")[0];
        console.error("Error adding product:", error.message);

        if (errDup === "E11000") {
          toast.error("El nombre del artículo ya existe, debe ser diferente");
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

  useEffect(() => {
    const selectedSubCategories = formik.values.category.flatMap(
      (cat) => subcategoriesMap[cat] || []
    );
    setSubCategories(selectedSubCategories);
  }, [formik.values.category]);

  const handleCategoryChange = (category) => {
    const currentCategories = formik.values.category;
    if (currentCategories.includes(category)) {
      formik.setFieldValue(
        "category",
        currentCategories.filter((item) => item !== category)
      );
    } else {
      formik.setFieldValue("category", [...currentCategories, category]);
    }
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formik.values[field];
    if (currentValues.includes(value)) {
      formik.setFieldValue(field, currentValues.filter((item) => item !== value));
    } else {
      formik.setFieldValue(field, [...currentValues, value]);
    }
  };

  return (
    <div className="flex items-center justify-center pt-[17vh]">
      <form
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 shadow-md rounded max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Artículo</h2>

        <div className="mb-3">
          <label htmlFor="image" className="block">
            Imagen:
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            className="w-2/3 p-2 border border-gray-300 rounded"
          />
        </div>
        {formik.errors.image && formik.touched.image && (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        )}

        <div className="mb-3">
          <label className="block cursor-pointer" onClick={() => setCategoryOpen(!categoryOpen)}>
            Categoría:
          </label>
          {categoryOpen && (
            <div className="ml-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={formik.values.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="ml-2">{category}</label>
                </div>
              ))}
            </div>
          )}
          {formik.errors.category && formik.touched.category && (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="block cursor-pointer" onClick={() => setSubCategoryOpen(!subCategoryOpen)}>
            Subcategoría:
          </label>
          {subCategoryOpen && (
            <div className="ml-4">
              {subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                  <div key={subCategory} className="flex items-center">
                    <input
                      type="checkbox"
                      name="subCategory"
                      value={subCategory}
                      checked={formik.values.subCategory.includes(subCategory)}
                      onChange={() => handleCheckboxChange("subCategory", subCategory)}
                    />
                    <label className="ml-2">{subCategory}</label>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">Selecciona una categoría primero</div>
              )}
            </div>
          )}
          {formik.errors.subCategory && formik.touched.subCategory && (
            <div className="text-red-500 text-sm">{formik.errors.subCategory}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="block">Nombre:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="material" className="block">Material:</label>
          <input
            id="material"
            name="material"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.material}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.material && formik.touched.material && (
            <div className="text-red-500 text-sm">{formik.errors.material}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="block">Descripción:</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="block cursor-pointer" onClick={() => setColorOpen(!colorOpen)}>
            Color:
          </label>
          {colorOpen && (
            <div className="ml-4">
              {colours.map((colour) => (
                <div key={colour} className="flex items-center">
                  <input
                    type="checkbox"
                    name="colour"
                    value={colour}
                    checked={formik.values.colour.includes(colour)}
                    onChange={() => handleCheckboxChange("colour", colour)}
                  />
                  <label className="ml-2">{colour}</label>
                </div>
              ))}
            </div>
          )}
          {formik.errors.colour && formik.touched.colour && (
            <div className="text-red-500 text-sm">{formik.errors.colour}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dimensions" className="block">Dimensiones:</label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dimensions}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.dimensions && formik.touched.dimensions && (
            <div className="text-red-500 text-sm">{formik.errors.dimensions}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="block">Cantidad:</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
        >
          Agregar Artículo
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductManage;
