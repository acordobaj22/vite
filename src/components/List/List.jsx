import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement,  CategoryScale, LinearScale,TimeScale} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(LineElement,CategoryScale,LinearScale, PointElement,TimeScale)

const List = ({obj, title}) => {
    
      return (
        <div>
          <p>Hola mundo</p>
        </div>
      )


};

export default List;
