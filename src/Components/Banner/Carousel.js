import React from 'react'
import { makeStyles } from '@mui/styles';
import axios from 'axios'


const useStyles = makeStyles(() => ({
   carousel:{

   }
  }))

const Carousel = (props) => {
    const classess = useStyles(props)

    const fetchTrendingCoins = async () => {
          const {data} = await axios.get()  
    }
  return (
    <div className={ classess.carousel}></div>
  )
}

export default Carousel