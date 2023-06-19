import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { connectws, sendws } from './Redux/actions'
import { Chart as ChartJS, LineElement, PointElement,  CategoryScale, LinearScale,TimeScale} from 'chart.js'

// import logo from './src/assets/Logo_uninorte.jpg'
import {Line} from 'react-chartjs-2'
import {parseISO} from 'date-fns'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chart from './components/Card/Card'
import SideContent from './components/SideContent/SideContent'

ChartJS.register(LineElement,CategoryScale,LinearScale, PointElement, TimeScale)




function App() {
  

  return (
    <div className='home'>
      <div className='cards'>
      <h2>Dashboard de energias renovables</h2>
      <img src='https://tenor.com/es/view/ypf-energia-energy-energiaquenosune-aerogenerador-gif-14099853.gif' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}/>
      {/* <img src={logo} className='img'/> */}
      </div>
      <div className='sidebar'>
        <SideContent/> 
        <div>
          <div className='cards'>
             <Chart index={0} title='Power'></Chart> 
             <Chart index={1} title='Energy'></Chart> 
             <Chart index={2} title='FP'></Chart>
          </div>
        </div>
      </div>
    </div>
  )

}

// const mapStateProps = (state) => ({
//   data : state
// })
// const mapDispatchToProps = {
//   connectws,sendws
// }

// function App() {
//   const [wsdata, setData] = useState([])

//   useEffect(() => {
//     setupWebSocket();
//   });

//   const setupWebSocket = () => {
//     const access_token = 'vn4HigAAAA11czEubG9yaW90LmlvGXEL1IAdq4R1ZW94I1fl8g=='
//     const dataRequest = {
//       cmd: 'cq',
//       filter: {
//         from: '1684628776696',
//         EUI: '4768C40A00260021',
//       }
//     };
//     const url= `wss://us1.loriot.io/app?token=${access_token}`;
//     const ws = new WebSocket(url);

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//       setTimeout(() => {
//         ws.send(JSON.stringify(dataRequest));
//       }, 500);
//     };
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log(message)
//         if (message.cmd === 'cq') {
//           let modifiedData = message.cache.map(item => {
//             let dividedArray= [
//               parseFloat(item.data.substring(1,6))/100,
//               parseFloat(item.data.substring(7,14))/100,
//               parseFloat(item.data.substring(15,18))/100
//             ];
//             return {...item, data:dividedArray};
//           } )
//           setData([])
//           setData(prevData => [...prevData, ...modifiedData]);
//         }
//     }

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.close();
//     };

//   }

  
//   let array=wsdata.map(item => item)

//   function structuredData (array,i) {
//     let result = {}; 
//     array.forEach(string => {
//       // Obtenemos la fecha y hora del string
//       const fecha = string.gws[0].time.slice(0, 10); // "2023-05-21"
//       const hora = string.gws[0].time.slice(11, 19); // "01:56:31"
      
//       // Verificamos si la propiedad ya existe en el objeto
//       if (result.hasOwnProperty(fecha)) {
//         // Si existe, agregamos la hora al array existente
//         result[fecha].push([hora,string.data[i]]);
//         result[fecha].reverse()
//       } else { 
//         // Si no existe, creamos una nueva propiedad con un array que contiene el objeto
//         result[fecha] = [hora,string.data[i]];
//       }
//     });
//     return result
//   };

//   let power=structuredData(array,0)
//   let energy= structuredData(array,1)
//   let fp=structuredData(array,2)

//   console.log(array)

//   return (
//     <div className='home'>
//       <div className='cards'>
//       <h2>Dashboard de energias renovables</h2>
//       <img src='https://tenor.com/es/view/ypf-energia-energy-energiaquenosune-aerogenerador-gif-14099853.gif' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}/>
//       <img src={logo} className='img'/>
//       </div>
//       <div className='sidebar'>
//         {/* <SideContent data={wsdata} /> */}
//         <div>
//         {wsdata ? (
//           <>
//             <div className='cards'>
//               <Chart obj={wsdata} title='Power'></Chart> 
//               <Chart obj={wsdata} title='Energy'></Chart> 
//               <Chart obj={wsdata} title='FP'></Chart>
//             </div>
//           </>
//         ) : (
//           <p>Esperando datos de Loriot...</p>
//         )}  
//         </div>
//       </div>
//     </div>
//   )

// }

export default App
