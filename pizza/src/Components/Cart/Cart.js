import React from 'react';
import './cart.css';
import { Component } from 'react';
import {connect} from 'react-redux';
import {addAmount, subAmount, deletePizza, isAmount, setFullPrice, setBonus, setOrderData, paymentType} from '../../actions/actionCreater';
import {Link} from 'react-router-dom';
import Glovo from '../Glovo/Glovo';
import DeleteButton from "../DeleteButton/DeleteButton";
import Input from "../Input/Input";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Axios from "axios";
import Validation from "../Validation/Validation";
class Cart extends Component{
    state = {
        fullPrice: 0,
        userId: localStorage.getItem("id"),
        userBonus: 0,
        payType: "cash",
        user: {},
        bonusCart: 0,
        bonus: 0,
        value: "Київ",
        validation: {
            type: "warning",
            message: ""
        },
        isCartStyle: true,
        formControls: {
            username: {
                value: "",
                type: "text",
                placeholder: "Ім'я"
            },
            telNumber: {
                value: "",
                placeholder: "Номер телефону",
                type: "text"
            },
            email: {
                value: "",
                placeholder: "Email",
                type: "email"
            },
        },
        addressControls: {
            address: {
                value: "",
                type: "text",
                placeholder: "Адреса"
            },
            house: {
                value: "",
                type: "text",
                placeholder: "Дім"
            },
            flat: {
                value: "",
                type: "text",
                placeholder: "Квартира"
            },
            driveway: {
                value: "",
                type: "text",
                placeholder: "Під'їзд"
            },
            floor: {
                value: "",
                type: "text",
                placeholder: "Поверх"
            },
        }
    } 
    
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this);
        this.handleBonus = this.handleBonus.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.getCurrentUser();
    }
    handleBonus = async (event) =>{
        const {userBonus} = this.state;
        if(event.target.value <= userBonus){
            await this.setState({
            bonusCart: event.target.value
        })
        }
    }
    handlePay = async (event) => {
        await this.setState({
            payType: event.target.value
        })
        const {paymentType} = this.props;
        paymentType(this.state.payType);
        localStorage.setItem("payType", this.state.payType);
    }
    getCurrentUser = () => {
        const {userId} = this.state;
        Axios.get(`http://localhost:3000/users/${userId}`).then((res =>{
            this.setState({
                userBonus: res.data.bonuses,
                user: res.data
            })
            console.log(res.data);
        }))
    }

    priceCounting = (arr) => {
        const {setFullPrice, setBonus} = this.props;
        let fullPrice = 0;
        arr.forEach(element => {
           const {price, amount} = element;
            fullPrice += price*amount;
        });
        setFullPrice(fullPrice - this.state.bonusCart);
        setBonus(fullPrice.toFixed(2)*0.05);
        return fullPrice; 
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        formControls[controlName] = control;
        this.setState({
            formControls,
        });
        console.log(formControls.username.value);
    }

    renderInputs = () => Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            placeholder={control.placeholder}
            className={"edit"}
            onChange={(event) => this.onChangeHandler(event, controlName)}
        />;
    })

    renderInputsAddress = () => Object.keys(this.state.addressControls).map((controlName, index) => {
        const control = this.state.addressControls[controlName];
        return <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            placeholder={control.placeholder}
            className={"edit"}
            onChange={(event) => this.onChangeHandlerAddress(event, controlName)}
        />;
    })

    onChangeHandlerAddress = (event, controlName) => {
        const formControls = { ...this.state.addressControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        formControls[controlName] = control;
        this.setState({
            addressControls: formControls,
        });
        // console.log(formControls.username.value);
    }
    // getCountry = () =>{
    //     Axios.get("https://api.visicom.ua/data-api/4.0/ru/search/adr_street.json?text=Киев,%20Крещатик&key=bcde63ba77862fdd760ae229468b1ec8")
    // }

    setStyleCart = () => {
        const {isCartStyle} = this.state;
        switch(isCartStyle){
            case true: {
                this.setState({isCartStyle: false});
                break;
            }
            case false: {
                this.setState({isCartStyle: true});
                break;
            }
            default: console.log(0);
        }
    }

    // deleteFunc = () =>{
    //     const {pizza, isAmount} = this.props;
    //     if(pizza === []){
    //         isAmount(true);
    //     }
        
    // }

    renderCart(arr){
        return arr.map(item =>{
            const {name,price,components, img, amount, id, sizeAndPrice} = item;
            const {addAmount, subAmount, deletePizza, isAmount} = this.props;
            // arr.forEach(element => {
            //     this.setState({
            //         fullPrice: element.amount * element.price1
            //     }) 
            // });
            return(
                <div className="cart__wrapper" key="id">
                        <div className="pizza__cart">
                            <div className="img__and__name">
                                <div className="img__block">
                                    <img src={img} alt="no_pizza" className="pizza__photo"/>
                                    <div className="pizza__weight">{sizeAndPrice} г</div>
                                </div>
                                <p className="cart__label name_cart">{name}</p>
                            </div>
                                <p className="cart__label price_cart">{price} грн.</p>
                            <p className="cart__label components_cart">{components}</p> 
                            <div className="manipulation_section">
                            <p className="media__price">{price} грн.</p>
                                <div className="change__amount">
                                    <div className="minus__cart" onClick={() => subAmount(amount,id, price)}>-</div>
                                    <p className="amount">{amount}</p>
                                    <div className="plus__cart" onClick={() => addAmount(amount, id, price)}>+</div>
                                </div>
                                <div className="delete__cart" onClick={() => deletePizza(id, price)}><DeleteButton /></div>
                            </div>
                    </div>
                    
                    
                </div>
            );
        })
    }

    pullRequest = async() =>{
        const idUser = localStorage.getItem("id");
        const {user,bonus, bonusCart} = this.state;
        user.bonuses = user.bonuses - bonusCart + this.props.myBonus;
        console.log(user);
            await Axios.put(`http://localhost:3000/users/${idUser}`, JSON.parse(JSON.stringify(user))).then((res)=>{
            console.log(res.data)
        })
    }

    setMyOrder = async() =>{
        const {setOrderData,pizza} =this.props;
        const {formControls, addressControls,value, payType, bonusCart} = this.state;
        let pizzaName = "";
        const idUser = localStorage.getItem("id");
        const {user} = this.state;
        pizza.map(item =>{
            const {name, amount} = item;
            pizzaName += name + " - " + amount + " шт.; ";
        })
        if((payType === "cash")||(payType === "card")){
            

        this.pullRequest();
            // console.log(this.state.user);
            // user.bonuses = user.bonuses - bonusCart;
            // await Axios.put(`http://localhost:3000/users/${idUser}`, JSON.parse(JSON.stringify(user))).then((res)=>{
            // console.log(res.data)
            // })
        }
        const {address,house, flat, driveway, floor} = this.state.addressControls;
        if((address.value === "")||(house.value==="")||(flat.value==="")||(driveway.value==="")||(floor.value==="")){
            this.setState({
                validation: {
                    type: "error",
                    message: "Введіть будь-ласка всі поля з інформацією доставки"
                }
            })
        }
        else if(formControls.username.value === ""){
            this.setState({
                validation: {
                    type: "error",
                    message: "Введіть будь-ласка ваше ім'я, або ім'я отримувача"
                }
            })
        }
        else if(pizzaName === ""){
            this.setState({
                validation: {
                    type: "error",
                    message: "Ви не обрали щодної піци"
                }
            })
        }
        else{
            
            let addressFull = "місто " + value + " вул. " + addressControls.address.value + ","+ addressControls.house.value + " кв." + addressControls.flat.value + " під'їзд №: " + addressControls.driveway.value + " поверх: " + addressControls.floor.value;
            setOrderData(addressFull,pizzaName,2,formControls.username.value);
            this.props.history.push("/payment");
        }
    }

    render(){
        const {pizza} = this.props;
        const {isCartStyle, formControls, addressControls, userBonus, validation} = this.state;
        const items = this.renderCart(pizza);
        const fullCost = this.priceCounting(pizza);
        return(
            <div className="full__cart">         
                <div className="order__list">
                    <p className="order__label">Ваше замовлення:</p>
                    <div className="pizza__check">
                        {items.length == 0 ? <div className="smile_block">
                    <SentimentVeryDissatisfiedIcon className="sad__smile"/> 
                    <p className="smile_label">Ви ще не додали жодної піци до корзини</p>
                    </div> : items}
                    </div>
                    <div className="order__full__price">
                        <p className="full__price">До сплати: {fullCost.toFixed(2)} грн.</p>      
                        <p className="full__price">Бонусів: {(fullCost.toFixed(2)*0.05).toFixed(2)}</p> 
                    </div>
                    <Glovo />
                    <p className="order__label">Оформлення замовлення:</p>
                    <div className="myOrder_type">
                    <div className="type__order">
                        <div className={isCartStyle ? "delivery__order" : "delivery__order deliv"} onClick={this.setStyleCart}>
                            <i className="fas fa-bicycle"></i>
                            <p className="order__type" >Доставка</p>
                        </div>
                        <div className={isCartStyle===false ? "solo__deliv__order" : "solo__deliv__order deliv"} onClick={this.setStyleCart}>
                            <i className="fas fa-home"></i>
                            <p className="order__type">Самовивіз</p>
                        </div>
                    </div>

                    <div className={isCartStyle ? "check__form" : "none"}>
                        <div className="contacts">
                            <p className="main__label__cart">Контакти</p>
                            <div className="edits__contacts">
                               {this.renderInputs()}
                                {/* <input type="text" placeholder="Ім'я" className="edit"/>
                                <input type="text" placeholder="Телефон" className="edit"/>
                                <input type="text" placeholder="Email" className="edit"/> */}
                            </div>
                        </div>

                        <div className="adress">
                            <p className="main__label__cart">Адрес</p>
                            <div className="edits__adress">
                                <select name="" id="" className="edit" placeholder="Місто" value={this.state.value} onChange={this.handleChange}>
                                    <option value="Київ">Київ</option>
                                    <option value="Запоріжжя">Запоріжжя</option>
                                </select>
                                {this.renderInputsAddress()}
                            </div>
                        </div>

                        <div className="payment">
                            <p className="main__label__cart">Оплата</p>
                            <div className="edits__payment">
                                <select name="" id="" defaultValue="Оберіть купон" className="edit">
                                    {/* <option value="" disabled>Оберіть купон</option> */}
                                    <option value="">-25% на другу піцу</option>
                                    <option value="">Разом дешевше</option>
                                </select>

                                <select name="" id="" value={this.state.payType} onChange={this.handlePay} defaultValue="Оберіть спосіб оплати" className="edit">
                                    {/* <option value=""  disabled>Оберіть спосіб оплати</option> */}
                                    <option value="cash">Готівка</option>
                                    <option value="card">Картою кур'єру</option>
                                    <option value="liqpay">LiqPay</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className={isCartStyle===false ? "check__form" : "none"}>
                        <div className="contacts">
                            <p className="main__label__cart">Контакти</p>
                            <div className="edits__contacts">
                               {this.renderInputs()}
                                {/* <input type="text" placeholder="Ім'я" className="edit"/>
                                <input type="text" placeholder="Телефон" className="edit"/>
                                <input type="text" placeholder="Email" className="edit"/> */}
                            </div>
                        </div>

                        <div className="adress">
                            <p className="main__label__cart">Адрес</p>
                            <div className="edits__adress">
                                <select name="" id="" className="edit" placeholder="Місто" value={this.state.value} onChange={this.handleChange}>
                                    <option value="Київ">Київ</option>
                                    <option value="Запоріжжя">Запоріжжя</option>
                                </select>
                                <select name="" id="" className="edit adress_edit">
                                    <option value="">Оберіть ресторан</option>
                                </select>
                            </div>
                        </div>

                        <div className="payment">
                            <p className="main__label__cart">Оплата</p>
                            <div className="edits__payment">
                                <select name="" id="" defaultValue="Оберіть купон" className="edit" >
                                    {/* <option value=""  disabled>Оберіть купон</option> */}
                                    <option value="">-25% на другу піцу</option>
                                    <option value="">Разом дешевше</option>
                                </select>

                                <select name="" id="" defaultValue="Оберіть спосіб оплати" className="edit" value={this.state.payType} onChange={this.handlePay}>
                                    <option value=""  disabled>Оберіть спосіб оплати</option>
                                    <option value="cash">Готівка</option>
                                    <option value="card">Картою кур'єру</option>
                                    <option value="liqpay">LiqPay</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="bonus_payment">
                        <button className="payment__btn" onClick={this.setMyOrder}>Замовити</button>
                        <div className="right-panel__cart">
                            <p className="full__price">До сплати: {fullCost.toFixed(2) - this.state.bonusCart} грн.</p>
                            <p className="full__price">Бонусів для списання: <input className="bonus__input" value={this.state.bonusCart} onChange={this.handleBonus} placeholder={userBonus} type="number" min="0" max={userBonus}/></p> 
                        </div>
                             
                    </div>
                            <div className="validation__problems">
                                {validation.message !== "" && <Validation type={validation.type} message={validation.message}/>}
                            </div>
                    </div>
                </div> 
            </div>
        );
    }
}
export default connect(state=>({
    pizza: state.pizza,
    myPrice: state.price,
    myBonus: state.bonus,
    payTypeValue: state.paymentType
}),{addAmount, subAmount, deletePizza, isAmount, setFullPrice, setBonus, setOrderData, paymentType})(Cart);