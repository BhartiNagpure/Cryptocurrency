import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import {  ThemeProvider } from '@material-ui/styles';
import { Container, createTheme, TableContainer, TextField, Typography, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core';
import{ useNavigate } from 'react-router-dom';
import {numberWithCommas} from './Banner/Carousal';
import { Pagination } from '@material-ui/lab';
import './Coinstable.css';


function Coinstable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(" ");
    const [page, setPage] = useState(1);
    const { currency , symbol} = CryptoState();
    const navigate = useNavigate();
  

// console.log(row.current_price.toFixed(2))

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })

    const handleSearch = () => {
        return coins.filter(
            (coin) => 
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant='h4' style={{ margin: 18, fontFamily: "Montserrat" }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Cryptocurrency..." variant='outlined'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)} />

                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />

                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {["Coin", "Price", "24th Change", "Market Cap"].map((head) => (
                                        <TableCell style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }}
                                            key={head}
                                            align={head === "Coin" ? " " : "right"}>

                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                             {handleSearch()
                             .slice((page-1)*10, (page-1)*10+10)
                             .map((row) => {
                              console.log("row" , row)
                              const profit = row.price_change_percentage_24h >0 ;
                
                           

                              return (
                                <TableRow className="row-hover"
                                onClick ={()=> navigate(`/coins/${row.id}`)}
                                    key={row.name}>

                                        <TableCell  component="th" scope="row"  style={{display:"flex", gap:15, }}>
                                         <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                                         <div style={{display:"flex" , flexDirection:"column"}}>
                                         <span style={{textTransform:"uppercase", fontSize:22}}>
                                            {row.symbol}
                                         </span>
                                         <span style={{color:"darkgrey"}}>{row.name}</span>
                                         </div>
                                        </TableCell>
                                        <TableCell align="right">
                                         {symbol}{" "}
                                         {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell align="right" style={{color:profit>0 ? "rgb(14, 203,129" : "red", fontWeight:500}}>
                                            { profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                        </TableCell>
                                </TableRow>
                              )
                             })}
                            </TableBody>
                        </Table>
                    )
                    }
                </TableContainer>
                <Pagination 
                 className={{ul:"line"}}
                 style={{
                    padding:20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                 }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_, value)=> {
                    setPage(value);
                    window.scroll(0,450);
                }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default Coinstable
