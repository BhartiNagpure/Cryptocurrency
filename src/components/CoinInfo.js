import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, Hidden, ThemeProvider } from '@material-ui/core';
import './CoinInfo.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
ChartJS.register(
  LineElement, CategoryScale, LinearScale, PointElement, Legend
)



function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  // let coinData = coin
  const { currency } = CryptoState();
  
const fetchHistoricData = async () => {

  const data = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
  // console.log("response", data.data.prices)
  setHistoricData(data?.data?.prices)
};

// console.log("days",days)

useEffect(() => {
  fetchHistoricData();
  console.log('data3', historicData)
}, [currency, days, coin, historicData]);


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
})

return (
  <ThemeProvider theme={darkTheme}>
    <div className='coinInfo-container'>

      {
        !historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <div style={{ width: '900px', height: '700px' }}>
            <Line
              data={{
                labels: historicData.map((coin) => {
                 let date = new Date(coin[0]);
                  let time = 
                  date.getHours() > 12 
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

            return days === 1 ? time : date.toLocaleDateString()
                }),
            datasets : [{
              data : historicData.map((coin) => coin[1]),
              label : `Price (Past ${days} Days) in ${currency}`,
              borderColor: 'gold'
                },
              ],
              }}
              options = {{
                elements:{
                  point : {
                    radius: 1,
                  },
                },
              }}               
               />
              <div style={{
                display : 'flex',
                marginTop: 20,
                justifyContent :"space-around",
                width: "100%"
              }}>
                {chartDays.map(day => (
                 
                  <SelectButton
                   key={day.value} 
                   onClick={() => setDays(day.value)}
                   selected={day.value === days} >
                    {day.label}
                    </SelectButton>
                   
                ))} 
              </div>

          </div>
        )
      }

    </div>
  </ThemeProvider>
)
}
export default CoinInfo

