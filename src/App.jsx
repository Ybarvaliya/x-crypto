import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchange from "./components/Exchange";
import Coins from './components/Coins';
import CoinDetail from './components/CoinDetail';
import Footer from './components/Footer';

function App() {
  
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/exchange' element={<Exchange></Exchange>}></Route>
          <Route path='/coins' element={<Coins></Coins>}></Route>
          <Route path='/coin/:id' element={<CoinDetail></CoinDetail>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  )
}

export default App
