import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import {
  LinearProgress,
  TableContainer,
  TableHead,
  Table,
  TextField,
 
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";

import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const CoinsTable = () => {
  // context
  const { currency, symbol } = CryptoState();

  const [coins, setCoins] = useState([]);
  // loading coins from api
  const [loading, setLoading] = useState(false);
  // search functionality
  const [search, setSearch] = useState("a");
  // for navigating particular crypto coin
  const history = useNavigate();

  // for pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        console.log(data);
        setCoins(data)
      setLoading(false)
      } catch (error) {
        console.error('Axios Error:', error);
      }
      
    }
    fetchCoins();
  }, [currency]);
 
  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search));
  };



  return (
  
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          CryptoCurrency Price by Market Cap
        </Typography>
        <TextField
          label="serach crypto currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", color: "white" }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "aqua" }} />
          ) : ( 
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "aqua" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history(`/coins/${row.id}`)}
                        style={{  backgroundColor: "#16171a",
                        cursor: "pointer",
                        fontFamily: "Montserrat",
                        "&:hover": {
                          backgroundColor: "#131111",
                        },}}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "aqua",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "white" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol} {row.current_price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol} {row.market_cap.toString().slice(0, -6)}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
          
          onChange={(_,value) => {
            setPage(value);
            window.scroll(0,450);

          }}
        ></Pagination>
      </Container>
   
  );
};

export default CoinsTable;
