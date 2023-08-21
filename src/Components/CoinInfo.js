import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../Config/api'

const CoinInfo = ({coin}) => {
  const [days, setDays] = useState(1)
  const [ historicaldata, setHistoricalData] = useState()

  const { currency } = CryptoState();

  // fun to fetch data 
  const fetchHistoricalData = async () => {
    const { data } = axios.get(HistoricalChart(coin.id, days, currency))
    console.log(data)
    setHistoricalData(data)
  }
  
  useEffect( ( )=> {
     fetchHistoricalData()
  }, [currency, days])

  return (
    <div>
        
    </div>
  )
}

export default CoinInfo