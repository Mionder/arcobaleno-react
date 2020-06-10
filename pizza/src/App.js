import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Drinks from './Components/Drinks/Drinks';
import './normalize.css';
import Pizzas from './Components/Pizzas/Pizzas';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Sales from './Components/Sales/Sales';
import Footer from './Components/Footer/Footer';
import SingleSale from './Components/SingleSale/SingleSale';
import Payment from './Components/Payment/Payment';
import Profile from './Components/Profile/Profile';
import ScrollToTop from 'react-router-scroll-top'
import WhereToBuy from './Components/WhereToBuy/WhereToBuy';
function App() {
  return (
    <Router>
    <div className="App">
    <ScrollToTop>
      <Header /> 
        <Route path="/" component={Pizzas} exact/>
        <Route path="/drinks" component={Drinks} exact/> 
        <Route path="/cart" component={Cart}/>
        <Route path="/login" component={Login}/>
        <Route path="/sales" component={Sales}/>
        <Route path="/sales:id" component={SingleSale}/>
        <Route path="/payment" component={Payment} />
        <Route path="/profile:username" component={Profile} />
        <Route path="/where_to_buy" component={WhereToBuy} />
      {/* <Pizzas /> */}
      <Footer />
      </ScrollToTop>
    </div></Router>
    
  );
}

export default App;
