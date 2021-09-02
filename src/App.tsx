import Header from './layouts/Header';
import CoinList from './components/CoinList';
import { ToastContainer } from "react-toastify";



// import './App.css';

function App() {
  return (
    <>
      <Header/>
      <ToastContainer autoClose={8000} />
      <CoinList/>
    </>
  );
}

export default App;
