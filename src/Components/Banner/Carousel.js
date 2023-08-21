import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../Config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

// css
const useStyles = makeStyles(() => ({
  carousel: {
    marginTop: 50,
  },
  carouselItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

// Integer number with commas function
export function numberWithCommas(x) {
  return x.toLocaleString("en-US");
}

// function of carousal
const Carousel = (props) => {
  const [trending, setTrending] = useState([]);

  const classess = useStyles(props);

  const { currency, symbol } = CryptoState();

 // using api we are fetching data
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
   console.log({data})
    setTrending(data);
  };
  // const fetchTrendingCoins = () => {
  //   return axios.get(TrendingCoins(currency)).then((res) => setTrending(res.data))
  // }
 
 // console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  // items
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classess.carouselItems} to={`/coins/${coin.id}`}>
       
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
    <div className={classess.carousel}>
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
    </div>
  );
};

export default Carousel;
