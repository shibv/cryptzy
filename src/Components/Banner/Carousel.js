import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../Config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import {
  LinearProgress
} from "@mui/material";


// Integer number with commas function
export function numberWithCommas(x) {
  return x.toLocaleString("en-US");
}

// function of carousal
const Carousel = () => {
  const [trending, setTrending] = useState([]);

 
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

 // using api we are fetching data
  const fetchTrendingCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
    setTrending(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  // items
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link style={{ display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",}} to={`/coins/${coin.id}`}>
       
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        ></img>
        <span
          style={{
            color: profit > 0 ? "rgb(14,203,129)" : "red",
            fontWeight: 500,
          }}
        >
          {coin?.symbol}
          &nbsp;
          <span>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  // responsive behaviour of carousal
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  return (
    <div style={{marginTop: 50,}}>
      
       { loading ? ( <LinearProgress style={{ backgroundColor: "aqua" }} />) : (
          <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        ></AliceCarousel>

        )}
      
    </div>
  );
};

export default Carousel;
