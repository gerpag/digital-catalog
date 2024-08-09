import { Mail, Instagram, MapPin, Phone } from 'react-feather';

const Contacto = () => {
  

  let numeroWhatsApp
  const whatsAppRandNum = ()=>{
    let randNum = Math.random()
    if( randNum< 0.5){
      numeroWhatsApp = "5491159434362";
    }else {
      numeroWhatsApp = "5491151212889"
    }
  }
  whatsAppRandNum()


  return (
    <div className="polirubro-container flex items-center justify-center bg-gray-100 pt-[17vh] h-[83vh]">
      <div className="text-left p-4 max-w-3xl mx-auto">
      

        <ul className="list-inside mb-4 text-3xl mt-6">
          <li className="flex items-center mb-2">
            <MapPin className="mr-2 " /> CABA, Villa Crespo, 
          </li>
          <li className="mb-2">
          Scalabrini Ortiz 639 piso 2 oficina 3
          </li>
          <li className="flex items-center mb-2">
            <Mail className="mr-2" /> <a href="mailto:polirubroprops@gmail.com"><span className='text-blue-500'>polirubroprops@gmail.com</span></a> 
          </li>
          <li className="flex items-center mb-2">
            <Instagram className="mr-2" /> <a target="_blank" rel="noreferrer" href="https://www.instagram.com/polirubroprops/">@polirubroprops</a>
          </li>
          <li className="flex items-center">
            <Phone className="mr-2" /> 11 5 943 4362 / 11 5 121 2889
          </li>
          <li className="flex items-center">
            
              
            
            <a
              href={`https://wa.me/${numeroWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Enviar mensaje de WhatsApp
            </a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Contacto;

