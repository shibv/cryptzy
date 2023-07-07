import { makeStyles } from '@mui/styles';
import {
    Container, Typography,
  } from "@mui/material";
import React from 'react'
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
    banner:{
         backgroundImage: 'url(./banner2.jpg)',

    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    },
    tagLine:{
        display:'flex',
        height:'40%',
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'center'
    }

  }))


const Banner = (props) => {
    const classess = useStyles(props)
  return (
    <div className={classess.banner}>
        <Container className={classess.bannerContent}  >
            <div className={classess.tagLine}>
                 <Typography variant='h2' style={{
                    fontWeight:'bold',
                    marginTop:75,
                    fontFamily: "Montserrat",

                 }}>
                  Cryptzy
                 </Typography>
                 <Typography
                   variant='subtitle2'
                   style={{
                    color:'darkgray',
                    textTransform:'capitalize',
                    fontFamily:"Montserrat"

                   }}
                 >
                    Get all the info regarding your favorite crypto currecncies

                 </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner