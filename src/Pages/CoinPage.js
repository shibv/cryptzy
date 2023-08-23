import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CryptoState} from '../CryptoContext'
import axios from 'axios';
import { SingleCoin } from '../Config/api';
import { makeStyles } from "@mui/styles";
import CoinInfo from '../Components/CoinInfo';
import { Typography } from '@mui/material';
import { numberWithCommas } from "../Components/CoinsTable"
 import { LinearProgress } from "@mui/material" ;

// css
const useStyles = makeStyles((theme ) => ({
  container:{
    display:'flex',
    '@media (max-width: 600px)': {
      flexDirection:"column",
      alignItems:"center"
    },
  },
  sidebar:{
    width: "30%",
    '@media (max-width: 600px)':{
      width : "100%",
    },
    display: "flex",
    flexDirection : "column",
    alignItems : "center",
    marginTop : 25,
    borderRight : "2px solid grey  "

  },
  heading : {
     fontWeight: "bold",
     marginBottom : 20, 
     fontFamily  : " Montserrat",
  },
  desciption : {
    width : "100%",
    fontFamily: "Montserrat ",
    padding: 25,
    paddingBottom : 15,
    paddingTop : 0 ,
    textAlign : " justify ", 

  },
  marketdata : {
    alignSelf : "start", 
    padding : 25 ,
    paddingTop : 10, 
    width: "100%", 
    '@media (min-width: 768px) and (max-width: 1024px)':{
      display : "flex",
      justifyContent: "space-around"
    },
    '@media (min-width: 481px) and (max-width: 786px)':{
      flexDirection : "column",
      alignItems : "center"
    },
    '@media (max-width: 480px) ':{
      alignItems:"start"
    },

  }
}));

const CoinPage = ( props) => {

  const { id } = useParams();

  const [coin,setCoin] = useState();

  const {currency, symbol} = CryptoState();

  const fetchCoin = async()  => {
    const {data} = await axios.get(SingleCoin(id));
    
    setCoin(data);
  }

  useEffect(() =>{
    fetchCoin()
  }, [])
  const classess = useStyles(props);
  if (!coin) return <LinearProgress style={{ backgroundColor: "aqua" }} />;
  return (
    <div className={classess.container}>
       <div className={classess.sidebar}>
         
            <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom : 20}} />
            <Typography variant='h3' className={classess.heading}  style={{fontWeight: 'bold'}} >{coin?.name}</Typography>
            <Typography variant='subtitle1' className={classess.desciption}>
                {coin?.description.en.split(". ")[0]}.
            </Typography>
            <div className={classess.marketdata}>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className={classess.heading}  style={{fontWeight: 'bold'}}>Rank:</Typography>
                   &nbsp;
                   <Typography variant='h5' style={{fontFamily : 'Montserrat'}}>
                   {numberWithCommas(coin?.market_cap_rank)}
                   </Typography>
                </span>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className={classess.heading}  style={{fontWeight: 'bold'}}>Current Price:</Typography>
                   &nbsp;
                   <Typography variant='h5' style={{fontFamily : 'Montserrat'}}>
                   {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
                   </Typography>
                </span>
                <span style={{ display : 'flex'}}>
                   <Typography variant='h5' className={classess.heading} style={{fontWeight: 'bold'}}>Market Cap:</Typography>
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