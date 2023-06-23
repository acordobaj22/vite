import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement,  CategoryScale, LinearScale,TimeScale} from 'chart.js'
import {Line} from 'react-chartjs-2'
import './Card.css'

ChartJS.register(LineElement,CategoryScale,LinearScale, PointElement,TimeScale)

const Chart = ({index,title}) => {

  const [loriotData, setLoriotData] = useState(null);
  const [datachart, setData] = useState(null);
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
          from: '1676888584',
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
      // webSocket.close();
      // console.log('Mensaje recibido del WebSocket de Loriot:', message);
      // Procesa los datos recibidos según tus necesidades
      structuredData(modifiedData,index)
      
    };
  
    webSocket.onerror = (error) => {
      console.error('Error en la conexión del WebSocket de Loriot:', error);
    };
  
    webSocket.onclose = () => {
      console.log('Conexión cerrada del WebSocket de Loriot');
    };
  }
  function structuredData (array,i) {
   // console.log(array)
    let result = {}; 
    let invertedData ={};
    
    array.forEach(string => {
      // Obtenemos la fecha y hora del string
      const fecha = string.gws[0].time.slice(0, 10); // "2023-05-21"
      const hora = string.gws[0].time.slice(11, 19); // "01:56:31"
      let partes = hora.split(":")
      let _hora = parseInt(partes[0]);
      let _min = Math.floor(parseInt(partes[1])/10)*10;
      // Verificamos si la propiedad ya existe en el objeto
      if (result.hasOwnProperty(fecha)) {
        // Si existe, agregamos la hora al array existente
        //result[fecha].push([hora,string.data[i]]);
        result[fecha][_hora].push([hora,string.data[i]]);
        
        // result[fecha].reverse()
      } else { 
        // Si no existe, creamos una nueva propiedad con un array que contiene el objeto
        let horas={}
        for (let i=0;i<=23;i++){
          horas[i]=[]
        }
        result[fecha] = horas;
        result[fecha][_hora].push([hora,string.data[i]]);
      }
      
    });
    for (let key in result) {
      for(let hour in result[key]){
        result[key][hour]=result[key][hour].reverse()
      }
    }
    //console.log(result)
    setData(Object.values(Object.values(Object.values(Object.values(result))[0])[0]))
    setLoriotData(result)
  };

  if (datachart){
    // console.log(datachart)
    // console.log(Object.values(loriotData)[0][0][0][0])
 
  // function structuredData (array,i) {
  //   let result = {}; 
  //   let invertedData ={};
    
  //   array.forEach(string => {
  //     // Obtenemos la fecha y hora del string
  //     const fecha = string.gws[0].time.slice(0, 10); // "2023-05-21"
  //     const hora = string.gws[0].time.slice(11, 19); // "01:56:31"
  //     let partes = hora.split(":")
  //     let _hora = parseInt(partes[0]);
  //     let _min = Math.floor(parseInt(partes[1])/10)*10;
  //     // Verificamos si la propiedad ya existe en el objeto
  //     if (result.hasOwnProperty(fecha)) {
  //       // Si existe, agregamos la hora al array existente
  //       //result[fecha].push([hora,string.data[i]]);
  //       result[fecha][_hora].push([hora,string.data[i]]);
        
  //       // result[fecha].reverse()
  //     } else { 
  //       // Si no existe, creamos una nueva propiedad con un array que contiene el objeto
  //       let horas={}
  //       for (let i=0;i<=23;i++){
  //         horas[i]=[]
  //       }
  //       result[fecha] = horas;
  //       result[fecha][_hora].push([hora,string.data[i]]);
  //     }
      
  //   });
  //   for (let key in result) {
  //     for(let hour in result[key]){
  //       result[key][hour]=result[key][hour].reverse()
  //     }
  //   }
  //   return result 
  // };
    //let array= Object.values(Object.values(Object.values(Object.values(aray))[0])[now])
    //setData(Object.values(Object.values(Object.values(Object.values(datachart))[0])[0]))
    // let label = datachart
    //console.log('array es,', Object.values(Object.values(Object.values(aray))[0])[0])
    // console.log('dates es,', aray)
    function selectHour() {
      let today = new Date()
      let now=parseInt(today.toLocaleString().split(",")[1].split(":")[0])
      console.log(now)
      //Object.values(Object.values(Object.values(Object.values(aray))[0])[now])
      setData(Object.values(Object.values(Object.values(Object.values(loriotData))[0])[now]))
      // const dates= Object.keys(aray[0])
      
    };
    function selectDay() {
      let datahora=[]
      let today = new Date()
      let now=parseInt(today.toLocaleString().split(",")[1].split(":")[0])
      //console.log(today.toLocaleString().split(",")[0].replace(/\//g,"-"))
      //console.log(loriotData["2023-05-21"])
      for ( let hour in loriotData["2023-05-21"]){
        let promhora=0
        loriotData["2023-05-21"][hour].forEach(x => x.length>0 ? promhora += x[1] : promhora=0 )
        promhora!=0 ? promhora / loriotData["2023-05-21"][hour].length : promhora=0
        datahora.push([hour, promhora])
      }
      setData(datahora)
    };
    function selectWeek(){
      let today = new Date()
      let now=parseInt(today.toLocaleString().split(",")[0].split("/")[0])
      let dataDay=[]
      for (let day in loriotData){
        let promday=0
        let datahora=[]
        console.log(loriotData[day])
        for ( let hour in loriotData[day]){
          let promhora=0
          loriotData[day][hour].forEach(x => x.length>0 ? promhora += x[1] : promhora=0 )
          promhora!=0 ? promhora / loriotData[day][hour].length : promhora=0
          datahora.push(promhora)
        }
        datahora.forEach(x => promday += x )
        promday = promday/datahora.length
        dataDay.push([day, promday])
        if (parseInt(day.split("-")[2])== (now-5)){
          console.log("hace 5 dias:", parseInt(day.split("-")[2]))
          break
        }
      }
      setData(dataDay)
    }
    function selectMonth(){
      let today = new Date()
      let now=parseInt(today.toLocaleString().split(",")[0].split("/")[1])
      let dataMonth=[]
      console.log(now)
    }
    //console.log(array)

    const label = datachart
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
              <label>{Object.keys(loriotData)[0]}</label>
            </div>
            <div>
              <label>Hora: <br/>{Object.values(loriotData)[0][0][0][0]}</label>
            </div>
            <div>
              <label>Valor: <br/>{Object.values(loriotData)[0][0][0][1]}</label>
            </div>
          </div>  
          <Line data={data} options={options} />
          <div>
            <button onClick={selectMonth}>mes</button>
            <button onClick={selectWeek}>semana</button>
            <button onClick={selectDay}>dia</button>
            <button onClick={selectHour}>Hora</button>
          </div>
        </div>
      )
 }


};

export default Chart;
