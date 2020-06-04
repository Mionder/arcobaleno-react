import React, {Component} from 'react';
import './Footer.css';
import visa from "./visa.png";
import mastercard from "./mastercard.png";
import {Link} from 'react-router-dom';
export default class Footer extends Component{
    render(){
        return(
            <footer className="footer">
                <div className="footer_item">
                    <Link to="/"><p className="footer_item_main">Domino's Pizza</p></Link>
                    <Link to="/"><p className="footer_label">Меню</p></Link>
                    <Link to="/where_to_buy"><p className="footer_label">Пиццерии</p></Link>
                    <Link to="/cart"><p className="footer_label">Корзина</p></Link>
                </div>
                <div className="footer_item">
                    <p className="footer_item_main">Контакты</p>
                    <p className="footer_label">info@dominos.ua</p>
                    <p className="footer_label">Оставить отзыв</p>
                    <p className="footer_label">044 222 11 11</p>
                </div>
                <div className="footer_item">
                    <p className="footer_item_main">Domino's Pizza</p>
                    <p className="footer_label">© 2020 Domino's Pizza Украина</p>
                    <div className="footer_label">Поддержка платежей</div>
                    <img src={visa} alt="" className="img_visa"/>
                    <img src={mastercard} alt=""/>
                </div>
            </footer>
        )
    }
}