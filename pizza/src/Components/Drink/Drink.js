import React, { Component } from 'react';
import './drink.css';
import {connect} from 'react-redux';
import {addPizza, isAmount} from '../../actions/actionCreater';
import Validation from "../Validation/Validation";

class Drink extends Component{
    state = {
        currentSize: {
            size: this.props.sizeAndPrice[0].size,
            price: this.props.sizeAndPrice[0].price,
        },
        currentStyle: {
            small: true,
            normal: false,
        },
        validation: {
            isValid: false,
            typeVal: "",
            message: "",
        }
    }

    handleAddDrink = async () =>{
        const {addPizza, id, name,img, amount, isAmount} = this.props;
        const drinkArr = this.props.pizza;
        await this.setState({validation: {isValid: false}})
        await drinkArr.forEach(item =>{
            if((id === item.id)&&(this.state.currentSize.size === item.sizeAndPrice)){
                this.setState({
                    validation : {
                        isValid: true,
                        message: "Ви вже замовили даний напій",
                        typeVal: "error"
                    }
                })
            }
        })
        if(!this.state.validation.isValid){
            addPizza(id, name, this.state.currentSize.price ,"",img,1,this.state.currentSize.size);
        }
        if(amount){
            isAmount(!amount);
        }
        // addPizza(id, name, this.state.currentSize.price ,"",img,1);
    }

    handleChangleSize = (newSize, activeSize) => {
        this.setState({
            currentSize: newSize
        }); 
        switch (activeSize) {
            case "small": {
                this.setState({ 
                    currentStyle: {
                        small: true,
                        normal: false
                    }
                }); 
                break;
            }
            case "normal":{
                this.setState({
                    currentStyle: {
                        small: false,
                        normal: true
                    }
                });
                break;
            }
            default: {
                return 0;
            }
        }
        
    }

    render(){
        const {name, type,img, sizeAndPrice} = this.props;
        const {currentSize, currentStyle} = this.state;
        const {isValid, message, typeVal} = this.state.validation;

        return(
            <div className="drink__full">
                <div className="drink__card">
                    <img src={img} alt="no"/>
                    <div className="info__drink">
                            <p className="name__drink">{name}</p>
                        <div className="size__drink">
                            <div className={currentStyle.small ? "size__small__drink active" : "size__small__drink"} onClick={() => this.handleChangleSize(sizeAndPrice[0], "small")}>330 мл</div>
                            <div className={currentStyle.normal ? "size__normal__drink active" : "size__normal__drink"} onClick={() => this.handleChangleSize(sizeAndPrice[1], "normal")}>500 мл</div>
                        </div>
                            <div className="price__block">
                                <p className="price__pizza">{currentSize.price} <span>грн</span></p>
                                <div className="button__order__pizza" onClick={this.handleAddDrink}> 
                                    В кошик
                                </div>
                            </div>
                            {isValid && 
                                <div className="validation__block__pizza">
                                    <Validation type={type} message={message} />
                                </div>
                            }
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state=>({
    pizza: state.pizza,
    amount: state.amount
}),{addPizza, isAmount})(Drink);