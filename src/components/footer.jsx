import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Footer() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);

   
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  return (
    <div className="h-[10vh] w-full mt-[5vh] flex items-center justify-center">
      {screenWidth > 600 ? (
        <p className="text-[1.15rem] font-sans">
          <span className="font-semibold">POLIRUBRO</span> Utilería en alquiler. Ciudad Autónoma de Buenos Aires, Argentina. Copyright {new Date().getFullYear()}. Todos los derechos reservados.{" "}
          <Link target="_blank" rel="noreferrer" to='/terminos-y-condiciones'>
            <span className="text text-blue-700 underline">Términos y Condiciones</span>
          </Link>
        </p>
      ) : (
        <p className="text-[1.15rem] font-sans">
          <span className="font-semibold">POLIRUBRO</span>{" "}
          <Link target="_blank" rel="noreferrer" to='/terminos-y-condiciones'>
            <span className="text text-blue-700 underline">Términos y Condiciones</span>
          </Link>
        </p>
      )}
    </div>
  );
}

export default Footer;
