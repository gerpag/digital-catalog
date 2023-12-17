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