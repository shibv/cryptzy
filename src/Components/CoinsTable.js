import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { LinearProgress, TableContainer, TableHead,Table, TextField, colors, createTheme, TableRow, TableCell, TableBody } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Container, Typography } from "@mui/material";

const CoinsTable = () => {
  const { currency } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); // through curely on data we are destructuring our data
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  // dark theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearcj = () =>{
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search)
    ))
  }
  return (
    <ThemeProvider theme={darkTheme}>
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
          style={{ marginBottom: 20, width: "100%" , color:'white'}}
          onChange={(e) => setSearch(e.target.value)}
         
        ></TextField>
        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{ backgroundColor:'gold'}}></LinearProgress>
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor:"lightblue"}}>
                           <TableRow>
                            {["Coin" , "Price" , "24h Change", "Market Cap"].map((head) => (
                              <TableCell style={{color:"black", fontWeight:"700" , fontFamily:"Montserrat",}} key={head} 
                               align={head === "Coin" ? "" : "right"}
                              >
                               {head}
                              </TableCell>
                            ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>{handleSearcj().map(row => )}</TableBody>
                    </Table>
                )
            }

        </TableContainer>

      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
