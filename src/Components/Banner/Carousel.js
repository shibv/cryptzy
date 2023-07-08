import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../Config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  carousel: {
    marginTop:50,
  },
  carouselItems:{},
}));

const Carousel = (props) => {
  const [trending, setTrending] = useState([]);
  const classess = useStyles(props);

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);


  // items
  const items = trending.map((coin) => {
       let profit = coin.price_change_percenatage_24h >= 0;



    return (
      <Link className={classess.carouselItems} to={`/coins/${coin.id}`} >
        <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom:10}}>
        </img> 
        <span>
          {coin?.symbol}
          &nbsp;
          <span>
          {profit && '+' } {coin?.price_change_percenatage_24h?.toFixed(2)}%
          </span>


        </span>

      </Link>
    )
  })

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
    <div className={classess.carousel} >
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
