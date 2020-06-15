import React, {Component} from 'react';
import * as CryptoJS from 'crypto-js';
import {setFullPrice, setOrderData, paymentType} from "../../actions/actionCreater";
import {connect} from 'react-redux';
import MoodIcon from '@material-ui/icons/Mood';
import "./payment.css";

class Payment extends Component{
    componentDidMount(){
        this.paymentLiqPaySignature();
    }

    paymentLiqPayData = () => {
        const {myPrice} = this.props;
        return btoa(`{"public_key":"i47874867893","version":"3","action":"pay","amount": ${myPrice},"currency":"UAH","description":"Arcobaleno's Pizza","order_id":"0014"}`);
    }
    paymentLiqPaySignature = () => {
        const private_key = "53G32HIO2VRHIyhovehcweEmxMyuZRGSlayXZX7B";
        // this.telegram();
        return CryptoJS
            .SHA1(`${private_key}${this.paymentLiqPayData()}${private_key}`)
            .toString(CryptoJS.enc.Base64);
    }
    telegram = async () => {
        const {myPrice,pizza,order} = this.props;
        let pizzaName = "";
        pizza.map(item =>{
            const {name, sizeAndPrice} = item;
            pizzaName += name + " Розмір: " + sizeAndPrice + "г. "+ "; ";
        })
        let message = `<b>Ім'я: </b>${order.name} \n<b>Ціна замовлення: </b>${myPrice} грн. \n<b>Замовлена піца: </b>${pizzaName} \n<b>Адреса: </b>${order.address} \n`;
        message = encodeURI(message);
        if(myPrice > 0){
        const response = await fetch(`https://api.telegram.org/bot1191473535:AAFsQKShNUMV-uhtuifYXLxgeB7zWRZSpqU/sendMessage?chat_id=-410753007&parse_mode=html&text=${message}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
    }
    
    render(){
        const {payType} = this.props;
        // const payType = localStorage.getItem("payType");
        return(
            <div>
                <form method="POST" onClick={this.telegram()} accept-charset="utf-8" action="https://www.liqpay.ua/api/3/checkout">
                    <input type="hidden" name="data" value={this.paymentLiqPayData()} />
                    <input type="hidden" name="signature" value={this.paymentLiqPaySignature()} />
                    <div className="payment_container">
                    <MoodIcon  className="mood_icon"/>
                        <div className="payment__text">
                            <span className="payment_label">Ваше замовлення додане в чергу. Оплатіть будь-ласка в обраний вами спосіб</span>
                        </div>
                    {payType === "liqpay" &&<button className="payForLiqPay">
                        <img name="btn_text"/>
                        <p >Оплатити</p>
                    </button>}
                    {/* <button onClick={this.telegram()}>Телега</button> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(state=>({
    myPrice: state.price,
    pizza: state.pizza,
    order: state.order,
    payType: state.payType
}),{setFullPrice,setOrderData, paymentType})(Payment)