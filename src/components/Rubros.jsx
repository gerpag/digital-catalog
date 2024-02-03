import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CardsRubros from "./CardsRubros";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductModal from "../commons/ProductModal";
import { useDispatch } from "react-redux";
import { setModalState } from "../../redux/modalSlice";
import { arrayProductosConDataImagen } from "../assets/auxiliarFunctions";
import { rubros } from "../assets/categorias";
import GrillaCategories from "./GrillaCategories";
import { colorsOne, colorsTwo } from "../assets/colorFilter";
import { categoriesWithSubcategories } from "../assets/catFilter";

const Rubros = () => {
  const location = useLocation();
  const search = useLocation().search;
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const colorParam = queryParams.get("color");
  const categoryParam = queryParams.get("cat");
  const subcategoryParam = queryParams.get("subcat");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    color: colorParam || "",
    category: categoryParam || "",
    subcategory: subcategoryParam || "",
  });

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryParam) {
      setExpandedCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    const productsFetch = async () => {
      try {
        let url = "/api/v1/product/search";
        let apiUrl = `${url}?=`;

        if (colorParam) {
          apiUrl += `&colour=${colorParam}`;
        }

        if (categoryParam) {
          apiUrl += `&category=${categoryParam}`;
        }

        if (subcategoryParam) {
          apiUrl += `&subCategory=${subcategoryParam}`;
        }

        const response = await axios.get(apiUrl);

        const urlsImages = response.data.map((url) => {
          return url.url_img;
        });

        let infoImagenesServer = await axios.get(
          `/api/v1/images/?imagenes=${urlsImages}`
        );

        let imagenes = infoImagenesServer.data.images;
        const productosConImagenes = arrayProductosConDataImagen(
          response.data,
          imagenes
        );
        setProducts(productosConImagenes);
      } catch (error) {
        console.error("No se pudo cargar los productos:", error);
      }
    };

    productsFetch();
  }, [colorParam, categoryParam, subcategoryParam, search]);

  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      const searchTermLower = searchTerm?.toLowerCase();
      const searchTermsArray = searchTermLower.split(" ");

      return searchTermsArray.every(
        (term) =>
          product.name?.toLowerCase().includes(term) ||
          product.colour?.toLowerCase().includes(term)
      );
    });
    setFilteredProducts(updatedFilteredProducts);
  }, [searchTerm, products]);

  const handleColor = async (color) => {
    try {
      const response = await axios.get(
        `/api/v1/product/search?colour=${color}`
      );
      setProducts(response.data);

      const newSearch = `?color=${color}${
        categoryParam ? `&cat=${categoryParam}` : ""
      }${subcategoryParam ? `&subcat=${subcategoryParam}` : ""}`;
      navigate({ search: newSearch });
    } catch (error) {
      console.error("no se pudo cargar un color", error);
    }
  };

  const handleCategory = async (category, subcategory) => {
    try {
      let url = `/api/v1/product/search?category=${category}`;

      const response = await axios.get(url);

      const urlsImages = response.data.map((url) => {
        return url.url_img;
      });

      let infoImagenesServer = await axios.get(
        `/api/v1/images/?imagenes=${urlsImages}`
      );

      let imagenes = infoImagenesServer.data.images;
      const productosConImagenes = arrayProductosConDataImagen(
        response.data,
        imagenes
      );

      const filteredProducts = subcategory
        ? productosConImagenes.filter(
            (product) => product.subcategory === subcategory
          )
        : productosConImagenes;

      const isExpanded = expandedCategories.includes(category);

      setProducts(filteredProducts);

      const newSearch = `?cat=${category}${
        subcategory ? `&subcat=${subcategory}` : ""
      }${colorParam ? `&color=${colorParam}` : ""}`;
      navigate({ search: newSearch });

      setSelectedSubcategory(subcategory || "");
      setSelectedCategory(category || "");

      setExpandedCategories((prevExpanded) =>
        isExpanded
          ? prevExpanded.filter((item) => item !== category)
          : [...prevExpanded, category]
      );

      setSelectedFilters({
        color: colorParam || "",
        category: category,
        subcategory: subcategory || "",
      });
    } catch (error) {
      console.error("no se pudo cargar una categoría", error);
    }
  };

  const handleResetFilterColor = () => {
    const searchParams = new URLSearchParams(location.search);

    if (colorParam) {
      searchParams.delete("color");
    }

    navigate({ search: searchParams.toString() });
  };

  const handleResetFilterCategory = () => {
    const searchParams = new URLSearchParams(location.search);

    if (categoryParam) {
      searchParams.delete("cat");
    }

    if (subcategoryParam) {
      searchParams.delete("subcat");
    }

    navigate({ search: searchParams.toString() });
  };
  const handleResetFilterSubCategory = () => {
    const searchParams = new URLSearchParams(location.search);

    if (subcategoryParam) {
      searchParams.delete("subcat");
    }

    navigate({ search: searchParams.toString() });
  };

  const handleModal = () => {
    dispatch(setModalState(!modalOpen));
    setModalOpen(!modalOpen);
  };

  const renderHomeGrid = () => {
    return <Home modal={modalOpen} />;
  };
  const isHomePage =
    location.pathname === "/rubros" && queryParams.toString() === "";

  return (
    <>
      <ProductModal modalOpen={modalOpen} handleModal={handleModal} />
      <div
        className={`${
          modalOpen && "opacity-50 brightness-50 pointer-events-none bg-black "
        }`}
      >
        <div className={`general flex ml-12 pt-[17vh]  `}>
          <div className="izquierda w-36 mr-32">
            <div>
              <h3 className="text-xl font-bold mb-3">Colores</h3>
              <div className="w-[20vh]">
                <div>
                  {colorsOne.map((item, index) => (
                    <button
                      key={index}
                      className=" w-5 h-5 m-1 rounded-full"
                      style={{ backgroundColor: item.color }}
                      onClick={() => handleColor(item.titulo)}
                    />
                  ))}
                </div>
                <div>
                  {colorsTwo.map((item, index) => (
                    <button
                      key={index}
                      className={"w-5 h-5 m-1 rounded-full"}
                      style={{ backgroundColor: item.color }}
                      onClick={() => handleColor(item.titulo)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="categories-subcategories overflow-y-auto max-h-[60vh] w-[30vh]">
              <h3 className="text-xl font-bold mb-3 mt-3">Categorías</h3>
              <ul>
                {categoriesWithSubcategories.map((categoryObj, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`hover:font-bold cursor-pointer ${
                        expandedCategories.includes(categoryObj.category)
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => handleCategory(categoryObj.category)}
                    >
                      <li
                        className={`text-base mt-1 ${
                          selectedFilters.category === categoryObj.category
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {categoryObj.category.toUpperCase()}
                      </li>
                    </div>
                    {expandedCategories.includes(categoryObj.category) && (
                      <ul>
                        {categoryObj.subcategories.map(
                          (subCategory, subIndex) => (
                            <Link
                              key={subIndex}
                              to="/rubros"
                              className={`hover:font-bold ${
                                subCategory === selectedFilters.subcategory
                                  ? "font-bold"
                                  : ""
                              }`}
                              onClick={() =>
                                handleCategory(
                                  categoryObj.category,
                                  subCategory
                                )
                              }
                            >
                              <li className="text-base mt-1 ml-4">
                                {subCategory.toUpperCase()}
                              </li>
                            </Link>
                          )
                        )}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
          <div className="derecha w-full">
            <div className="flex">
              <input
                type="text"
                className=" border-b-2 border-black mb-3 bg-transparent outline-none"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex">
                {categoryParam && (
                  <button
                    onClick={handleResetFilterCategory}
                    className="border-[1px] bg-gray-200 rounded-xl w-auto px-2 mx-2 hover:bg-gray-300 "
                  >
                    {categoryParam.toUpperCase()}{" "}
                    <span
                      className=" ml-3 text-black font-bold "
                      onClick={handleResetFilterCategory}
                    >
                      x
                    </span>
                  </button>
                )}
                {subcategoryParam && (
                  <button
                    onClick={handleResetFilterSubCategory}
                    className="border-[1px] bg-gray-200 rounded-xl w-auto px-2 mx-2 hover:bg-gray-300 "
                  >
                    {subcategoryParam.toUpperCase()}
                    <span
                      className=" ml-3 text-black font-bold "
                      onClick={handleResetFilterSubCategory}
                    >
                      x
                    </span>
                  </button>
                )}
                {colorParam && (
                  <button
                    onClick={handleResetFilterColor}
                    className="border-[1px] bg-gray-200 rounded-xl w-auto mx-2 px-2 hover:bg-gray-300 relative"
                  >
                    {colorParam.toUpperCase()}
                    <span
                      className=" ml-3 text-black font-bold "
                      onClick={handleResetFilterColor}
                    >
                      x
                    </span>
                  </button>
                )}
              </div>
            </div>
            {isHomePage ? (
              <>
                <GrillaCategories />
              </>
            ) : (
              <CardsRubros
                products={filteredProducts}
                modalOpen={modalOpen}
                handleModal={handleModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rubros;
