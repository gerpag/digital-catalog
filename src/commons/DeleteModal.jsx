import React from "react";

function DeleteModal({ handleModalDelete, modalDelete, handleDelete }) {
  return (
    <>
      {modalDelete && (
        <div className="h-[25vh] w-[25vw] bg-[#f2f2f2] fixed z-50 top-[37%] left-[37%] rounded-lg flex justify-around flex-col items-center ">
          <h2 className="font-semibold">
            Seguro que desea eliminar el producto?
          </h2>
          <div className="flex justify-between w-1/2">
            <button className="hover:font-bold " onClick={handleDelete}>
              Eliminar
            </button>
            <button className="hover:font-bold " onClick={handleModalDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
