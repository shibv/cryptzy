import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
  
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";


const Header = () => {
  
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();


 

  return (
    
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              style={{flex: 1,
                color: "aqua",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",}}
              variant="h4"
              fontWeight='bold'
              onClick={() => navigate("/")}
            >
              Cryptzy
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
              }}
              value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
 
  );
};

export default Header;
