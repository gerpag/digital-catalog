export function arrayProductosConDataImagen(productos, imagenes) {
    let arrayResultado = [];
  
    for (let i = 0; i < productos.length; i++) {
      for (let j = 0; j < imagenes.length; j++) {
        if (productos[i].url_img === imagenes[j].name) {
          productos[i].image = imagenes[j].data;
          arrayResultado.push(productos[i]);
        }
      }
    }
  
    return arrayResultado;
  }


  export function ordenProductosCarrusel(productos,productId){

    const filter1=productos.filter((product)=>{return product._id !==productId})
    const filter2=productos.find((product)=>{return product._id ===productId})
    filter1.unshift(filter2)
    
    return filter1}