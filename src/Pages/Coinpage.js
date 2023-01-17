
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import '../components/Coinstable.css'
import { Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
// import { numberWithCommas } from '../components/Banner/Carousal';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Coinpage() {
  let { id } = useParams();
  const [coin, setCoin] = useState([]);
  const { currency, symbol } = CryptoState();

console.log("coin", coin)


  const fetchCoin = async (id) => {
    const { data } = await axios.get(SingleCoin(id));
    // const data = await axios.get(SingleCoin(id));
    // setCoin(data?.data)
    setCoin(data)
  };



  useEffect(() => {
    fetchCoin(id);
  }, [id])

  // console.log(coin);
  if (!coin) <LinearProgress style={{ backgroundColor: "gold" }} />


  return (
    <div className='container' style={{ display: "flex" }}>
     
      <div className='sidebar'>
        <img src={coin?.image?.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant='h4' style={{
          fontWeight: "800", fontFamily: "Montserrat",
          marginBottom: 20
        }} className='heading'>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className='description'>
          {ReactHtmlParser(coin?.description?.en.split(". ")[0])}.
        </Typography>

        <div className='marketData'>
          <span style={{ display: 'flex' }}>
            <Typography variant='h6' style={{
              fontWeight: "800", fontFamily: "Montserrat",
              marginBottom: 20
            }} className='heading'>Rank :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h6' style={{
              fontWeight: "800", fontFamily: "Montserrat",
              marginBottom: 20
            }} className='heading'>Current Price :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' style={{ fontFamily: "Montserrat" }}>
              {symbol} {" "}
            {/* { Object.keys(coin).length>0 ? numberWithCommas(coin["market_data"]["current_price"]["inr"]): */}
            {coin?.market_data?.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
  
          <span style={{ display: 'flex' }}>
            <Typography variant='h6' style={{
              fontWeight: "800", fontFamily: "Montserrat",
              marginBottom: 20
            }} className='heading'>Market Cap :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' style={{ fontFamily: "Montserrat" }}>
            {symbol}{" "}
             {/* {numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M */}
             {/* { Object.keys(coin).length>0 ? numberWithCommas(coin["market_data"]["market_cap"]["currency.toLowerCase()"]): */}
             {coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6)} M
            </Typography>
          </span>
          
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage
