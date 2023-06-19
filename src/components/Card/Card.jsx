import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement,  CategoryScale, LinearScale,TimeScale} from 'chart.js'
import {Line} from 'react-chartjs-2'
import './Card.css'

ChartJS.register(LineElement,CategoryScale,LinearScale, PointElement,TimeScale)

const Chart = ({index,title}) => {

  const [loriotData, setLoriotData] = useState(null);
  // const ws = useSelector((state) => state.ws.data)
  // dispatch(connectws())
  

  useEffect(() => {
    connectToLoriotWebSocket();
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
      let modifiedData = message.cache.map(item => {
        let dividedArray= [
          parseFloat(item.data.substring(1,6))/100,
          parseFloat(item.data.substring(7,14))/100,
          parseFloat(item.data.substring(15,18))/100
        ];
        return {...item, data:dividedArray};} )
      console.log(modifiedData)
      // webSocket.close();
      // console.log('Mensaje recibido del WebSocket de Loriot:', message);
      // Procesa los datos recibidos según tus necesidades
      setLoriotData(modifiedData)
    };
  
    webSocket.onerror = (error) => {
      console.error('Error en la conexión del WebSocket de Loriot:', error);
    };
  
    webSocket.onclose = () => {
      console.log('Conexión cerrada del WebSocket de Loriot');
    };
  }
  if (loriotData){
    let aray=structuredData(loriotData,index)
 
  function structuredData (array,i) {
    let result = {}; 
    let invertedData ={}
    array.forEach(string => {
      // Obtenemos la fecha y hora del string
      const fecha = string.gws[0].time.slice(0, 10); // "2023-05-21"
      const hora = string.gws[0].time.slice(11, 19); // "01:56:31"

      // Verificamos si la propiedad ya existe en el objeto
      if (result.hasOwnProperty(fecha)) {
        // Si existe, agregamos la hora al array existente
        result[fecha].push([hora,string.data[i]]);
        
        // result[fecha].reverse()
      } else { 
        // Si no existe, creamos una nueva propiedad con un array que contiene el objeto
        result[fecha] = [];
        result[fecha].push([hora,string.data[i]]);
      }
      
    });
    for (const key in result) {
      if (Array.isArray(result[key])) {
        invertedData[key] = result[key].reverse();
      }
    }
    return invertedData
  };






    const array= Object.values(aray)
    const dates= Object.keys(aray)
    console.log('array es,', array)
    console.log('dates es,', dates)

    const label = array[0]
    const labels= label.map(array => array[0])
    const value= label.map(array => array[1])
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Valor',
            data: value,
            fill: false,
            borderColor: '#1976D2',
            tension: 0.1,
          },
        ],
      };
    
      const options = {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Tiempo',
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: title,
            }
          },
        },
        plugins:{
          legend: {
            display: false
          }
        }
      };
   
    
      return (
        <div className='card'>
          <h3>{title}</h3>
          <h5>Ultima lectura:</h5>
          <div className='lasttext'>
            <div>
              <label>Fecha: </label>
              
              <label>{dates[0]}</label>
            </div>
            <div>
              <label>Hora: <br/>{labels[labels.length - 1]}</label>
            </div>
            <div>
              <label>Valor: <br/>{value[value.length - 1]}</label>
            </div>
          </div>  
          <Line data={data} options={options} />
        </div>
      )
  }


};

export default Chart;
