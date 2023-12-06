import React, { useEffect, useState } from 'react'
import './CoinPage.css'
import { useParams } from 'react-router-dom'
import {CryptoState} from '../CryptoContext'
import axios from 'axios';
import { SingleCoin } from '../Config/api';
import CoinInfo from '../Components/CoinInfo';
import { Typography } from '@mui/material';
import { numberWithCommas } from "../Components/CoinsTable"
 import { LinearProgress } from "@mui/material" ;


// css


const CoinPage = ( ) => {

  const { id } = useParams();

  const [coin,setCoin] = useState();

  const {currency, symbol} = CryptoState();

  const fetchCoin = async()  => {
    const {data} = await axios.get( `https://api.coingecko.com/api/v3/coins/${id}`);
    
    setCoin(data);
  }

  useEffect(() =>{
    fetchCoin()
  }, [])
 
  if (!coin) return <LinearProgress style={{ backgroundColor: "aqua" }} />;
  return (
    <div className='container'>
       <div className='sidebar'>
         
            <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom : 20}} />
            <Typography variant='h3' className='heading'  style={{fontWeight: 'bold'}} >{coin?.name}</Typography>
            <Typography variant='subtitle1' className='desciption'>
                {coin?.description.en.split(". ")[0]}.
            </Typography>
            <div className='marketdata'>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className='heading' style={{fontWeight: 'bold'}}>Rank:</Typography>
                   &nbsp;
                   <Typography variant='h5' style={{fontFamily : 'Montserrat'}}>
                   {numberWithCommas(coin?.market_cap_rank)}
                   </Typography>
                </span>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className='heading'  style={{fontWeight: 'bold'}}>Current Price:</Typography>
                   &nbsp;
                   <Typography variant='h5' style={{fontFamily : 'Montserrat'}}>
                   {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
                   </Typography>
                </span>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className='heading' style={{fontWeight: 'bold'}}>Market Cap:</Typography>
                   &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
                </span>
            </div>

       </div>
       <CoinInfo coin={coin}></CoinInfo>
    </div>
  )
}

export default CoinPage