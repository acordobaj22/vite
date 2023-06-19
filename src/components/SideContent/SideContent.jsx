import React, {useEffect,useState} from 'react';
import lora from '../../assets/LoRaWAN_Logo.svg'
import './SideContent.css'

const SideContent = () => {
  const [loriotData, setLoriotData] = useState(null);
  // const ws = useSelector((state) => state.ws.data)
  // dispatch(connectws())
  

  useEffect(() => {
    connectToLoriotWebSocket();
    console.log(loriotData)
  },[])

  function connectToLoriotWebSocket() {
    const access_token = 'vn4HigAAAA11czEubG9yaW90LmlvGXEL1IAdq4R1ZW94I1fl8g=='
    const url= `wss://us1.loriot.io/app?token=${access_token}`;
    const webSocket = new WebSocket(url);
  
    webSocket.onopen = () => {
      // console.log('Conexión establecida al WebSocket de Loriot');
      
      // Enviar la solicitud dataRequest
      const dataRequest = {
        cmd: 'cq',
        filter: {
          from: '1684628776696',
          EUI: '4768C40A00260021',
        },
      };
      webSocket.send(JSON.stringify(dataRequest));
    };
  
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // webSocket.close();
      // console.log('Mensaje recibido del WebSocket de Loriot:', message);
      // Procesa los datos recibidos según tus necesidades
      setLoriotData(message.cache)
    };
  
    webSocket.onerror = (error) => {
      console.error('Error en la conexión del WebSocket de Loriot:', error);
    };
  
    webSocket.onclose = () => {
      console.log('Conexión cerrada del WebSocket de Loriot');
    };
  }
  // Lógica y estado del componente aquí
  
  return (
    <div className='card'>  
      <img src={lora} />
      {loriotData ? (
      <>
        <p>ID transmisor: {loriotData[0]['EUI']}</p>
        <p>ID receptor: {loriotData[0]['gws'][0]['gweui']}</p>
        <p>Paquetes recibidos hoy: {loriotData.length}</p>
      </>
    ) : (
      <p>Esperando datos de Loriot...</p>
    )}
    </div>
  );
};

export default SideContent;
