import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:4000/api/v1/user/login", values)
      .then((res) => {
        dispatch(setUserData(res.data));
        Cookies.set("token", res.data.token);
        toast.success(`Bienvenido ${res.data.email}`);
        resetForm();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isDisabled =
    formik.values.email === "" || formik.values.password === "";
  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <span className="text-red-600 text-sm">
            {formik.touched.email && formik.errors.email}
          </span>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600">
            Contraseña
          </label>
          <div className="flex border rounded-md py-2 px-3 text-gray-700">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
              className="w-full  focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <span className="text-red-600 text-sm">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>
        <button
          disabled={isDisabled}
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-md transition duration-300 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
              : "bg-gray-800"
          }`}
        >
          Iniciar sesión
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
