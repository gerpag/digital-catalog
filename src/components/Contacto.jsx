// import React from 'react';

// const Contacto = () => {
//   return (
//     <div className="polirubro-container flex items-center justify-center  bg-gray-100 mt-10">
//       <div className="text-left p-4 max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold mb-4 ">CONTACTO</h2>
        
//         <ul className=" list-inside mb-4 text-3xl mt-10 ">
//           <li><i class="fa-solid fa-location-dot"></i> CABA, Villa Crespo,
// Scalabrini Ortiz 639 piso 2 oficina 3 </li>
//           <li>polirubroprops@gmail.com</li>
//           <li>@polirubroprops </li>
//           <li> 11 5 943 4362 / 11 5 121 2889</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Contacto;

//-----------------------------------------------


import React from 'react';
import { Mail, Instagram, MapPin, Phone } from 'react-feather';

const Contacto = () => {
  return (
    <div className="polirubro-container flex items-center justify-center bg-gray-100 mt-10">
      <div className="text-left p-4 max-w-3xl mx-auto">
      

        <ul className="list-inside mb-4 text-3xl mt-6">
          <li className="flex items-center mb-2">
            <MapPin className="mr-2 " /> CABA, Villa Crespo, 
          </li>
          <li className="mb-2">
          Scalabrini Ortiz 639 piso 2 oficina 3
          </li>
          <li className="flex items-center mb-2">
            <Mail className="mr-2" /> polirubroprops@gmail.com
          </li>
          <li className="flex items-center mb-2">
            <Instagram className="mr-2" /> @polirubroprops
          </li>
          <li className="flex items-center">
            <Phone className="mr-2" /> 11 5 943 4362 / 11 5 121 2889
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contacto;

