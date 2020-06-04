import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import cart from './img/supermarket.png';
import {connect} from 'react-redux';
import {setUser} from '../../actions/actionCreater';
import CartIcon from "../CartIcon/CartIcon";
import Adaptive from '../Adaptive/Adaptive';
class Header extends Component {  
    render(){
        const {user, amount} = this.props;
        console.log((user !== '') && (user !== null));
        return(
            <header className="header">
                <div className="container">
                    <nav>
                        <ul className="nav__bar">
                            <Link to="/"><li className="logo">
                                Dominos's Pizza
                            </li></Link>
                            {/* <Link id="menu-togle" className="menu__navig" to="/cart"><div  ></div></Link> */}

                            <Link className="links" to="/sales"><li className="nav__link">Акції</li></Link>
                            <Link className="links"to="/"><li className="nav__link">Піца</li></Link>
                            <Link className="links"to="/drinks"><li className="nav__link">Напої</li></Link>
                            <Link className="links" to={((user !== '') && (user !== null)) ? "/profile"+user : "/login"}><li className="nav__link">{((user !== '') && (user !== null)) ? `Привіт, ${user}` : "Авторизація"}</li></Link>
                            <li className="nav__link">
                               <Link to="/cart"> <div className="cart__full">
                               <Link to="/cart">
                                   <div className="cart__left">
                                         {/* <img src={cart} alt=""/> */}
                                         <CartIcon 
                                         className="cart_icon_header"
                                         invisible = {amount}
                                         />
                                    </div>
                                </Link>
                                    <div className="cart__right">
                                        Замовити
                                    </div>
                                </div></Link>
                            </li>
                            <Adaptive />
                        </ul>

                    </nav>
                </div>
            </header>
        )
    }
}
export default connect(state =>({
    user: state.user,
    amount: state.amount
}),{setUser})(Header);