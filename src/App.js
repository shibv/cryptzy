
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
 //import { makeStyles } from '@mui/material';
 import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  App:{
    backgroundColor:"#14161a",
    color:'white',
    minHeight:'100vh'
  }
}))
function App(props) {


  const classess = useStyles(props)

  return (
    <BrowserRouter>
       <div className={classess.App}>
        <Header/>
        <Routes>
        <Route path='/' Component={Homepage} exact ></Route>
        <Route path='/coins/:id' Component={CoinPage} exact ></Route>

        </Routes>
        

       </div>

    </BrowserRouter>
  );
}

export default App;
