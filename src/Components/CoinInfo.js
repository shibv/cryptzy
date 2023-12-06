import axios from "axios";
import "../App.css"
import { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { Line } from "react-chartjs-2";

import { chartDays } from "../Config/data";
import { CryptoState } from "../CryptoContext";
import { CircularProgress } from "@mui/material";


import { Chart, registerables } from "chart.js";
import SelectButton from "./SelectButton";


Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);


  const fetchHistoricData = async () => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days,currency]);



  return (
 
      <div className="container1">
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "aqua" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "aqua",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
 
  );
};

export default CoinInfo;
