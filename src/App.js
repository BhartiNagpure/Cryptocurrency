
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coinpage from './Pages/Coinpage';
import Homepage from './Pages/Homepage';


const useStyles= makeStyles(() => ({
  App:{
    backgroundColor:"#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  
  const classes= useStyles();

  return (
    <div >
   <BrowserRouter>
   <div className={classes.App}>
      <Header />
        <Routes>
          <Route path='/Cryptocurrency/' element={<Homepage/>} />
          <Route path='/coins/:id' element={<Coinpage/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
