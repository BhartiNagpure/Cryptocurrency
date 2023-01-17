import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousal from './Carousal';


const useStyles= makeStyles(() => ({
    banner:{
        backgroundImage:"url(./banner2.jpg)"
    },
    bannercontent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline:{
       display:"flex",
       height:"40%",
       flexDirection:"column",
       justifyContent:"center",
       textAlign:"center"
    }

}));

function Banner() {
    const classes= useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannercontent}>
        <div className={classes.tagline}>
            {/* <Typography variant='h6' style={{fontWeight:"bold", color:"darkgray",  fontFamily:"Montserrat"}}>Welcome to... </Typography> */}
        <Typography variant='h2' style={{fontWeight:"bold", marginBottom:15, fontFamily:"Montserrat"}}>
          CryptoVerse
        </Typography>
        <Typography variant='subtitle2' style={{color:"darkgray", textTransform:"capitalize", fontFamily:"Montserrat"}}>
         Get all the Info about your favourite crypto currency
        </Typography>
        </div>
        <Carousal/>
        </Container>
      
    </div>
  )
}

export default Banner
