import { Link } from "react-router-dom";

function CardCategory({ category }) {
  if (!category) {
    return null; 
  }
  return (
    <Link to={`/rubros/?cat=${category.category}`}>
      <div className="aspect-square relative  overflow-hidden  ">
        <p className="text-[white]  lg:text-[1.7rem] md:text-[1.4rem] xs:text-[1.7rem]  relative top-[42%] text-center font-sans font-semibold z-10">
          {category.category}
        </p>
        <img
          src={category.url_img}
          className="object-fit object-left-bottom  absolute inset-0 hover:scale-[1.2] transition-transform duration-1000 hover:opacity-70 transition-filter hover:brightness-50"
          alt={category.category}
        />
      </div>
    </Link>
  );
}

export default CardCategory;
