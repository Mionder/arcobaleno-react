import React, { Component } from 'react';
import './pizza.css';
import {connect} from 'react-redux';
import {addPizza, isAmount} from '../../actions/actionCreater';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Axios from 'axios';
import Validation from "../Validation/Validation";

class Pizza extends Component{
    state = {
        currentSize: {
            size: this.props.sizeAndPrice[0].size,
            price: this.props.sizeAndPrice[0].price,
        },
        currentStyle: { 
            small: true,
            normal: false,
            big: false
        },
        user: {
        },
        validation: {
            message: "",
            isValid: false,
            type: ""
        },
        isMatches: false
    }

    componentDidMount(){
        this.handleAddPizza = this.handleAddPizza.bind(this);
        let myLength = document.getElementsByClassName("size__small").length;
        for(let i=0; i<myLength;i++)
        {document.getElementsByClassName("size__small")[i].classList.add("size__small__active");
    }
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
                        normal: false,
                        big: false
                    }
                }); 
                break;
            }
            case "normal":{
                this.setState({
                    currentStyle: {
                        small: false,
                        normal: true,
                        big: false
                    }
                });
                break;
            }
            case "big": {
                this.setState({
                    currentStyle: {
                        small: false,
                        normal: false,
                        big: true
                    }
                });
                break;
            }
            default: {
                return 0;
            }
        }
        
    }

    handleAddPizza = async () =>{
        const {addPizza, id, name, components,src, isAmount, amount} = this.props;
        const pizzaArr = this.props.pizza;
        await this.setState({validation: {isValid: false}})
        await pizzaArr.forEach(item =>{
            if((id === item.id)&&(this.state.currentSize.size === item.sizeAndPrice)){
                this.setState({
                    validation : {
                        isValid: true,
                        message: "Ви вже замовили дану піцу",
                        type: "error"
                    }
                })
            }
        }) 
        if(!this.state.validation.isValid){
            addPizza(id, name, this.state.currentSize.price ,components,src,1,this.state.currentSize.size);
        }
        if(amount){
            isAmount(!amount);
        }
    }

    onChangeSize = (size, id, price) =>{

        console.log(size+"__active");

        let masiv = ["small","normal","big"];
        let new_masiv = masiv.filter(item =>{
            return item !== size;
        })
        
        console.log(new_masiv);

        document.getElementsByClassName("price__pizza")[id].innerHTML = price + "<span> грн</span>";
        document.getElementsByClassName("size__"+ new_masiv[0])[id].classList.remove("size__" + new_masiv[0] + "__active");
        document.getElementsByClassName("size__"+ size)[id].classList.add("size__"+ size +"__active");
        document.getElementsByClassName("size__"+ new_masiv[1])[id].classList.remove("size__" + new_masiv[1] + "__active");

    }

    addLikedPizza = async () =>{
        //С редьюсера забрали айди юзера и в него запостили мол ему нрав пицца с этим айди
        //можно только айди, а там уже выгружать айди и мутить красоту
       
        const isLiked = {};
        const idUser = localStorage.getItem("id");

        await Axios.get(`http://localhost:3000/users/${idUser}`).then((res)=>{
            console.table(this.props._id);
            res.data.isLiked.forEach(element => {
                if(element === this.props._id){
                    this.setState({isMatches: true})
                }
            });
            if(!this.state.isMatches){
                res.data.isLiked.push(this.props._id);
                this.setState({
                    user: res.data
                })
            }
        })
        this.pullRequest();
        
    }

    pullRequest = async () => {
        const idUser = localStorage.getItem("id");
        const {user} = this.state;
        await Axios.put(`http://localhost:3000/users/${idUser}`, JSON.parse(JSON.stringify(user))).then((res)=>{
            console.log(res.data)
        })
    }

    render(){
        const {name,components,src, sizeAndPrice, amount, id} = this.props;
        const {currentSize, currentStyle} = this.state;
        const {isValid, message, type} = this.state.validation;

        return(
            <div className="pizza__full">
                <div className="pizza__card">
                    <div className="image_pizza">
                        <img src={src} alt=""/>
                    {/*    <FormControlLabel*/}
                    {/*    control={<Checkbox icon={<FavoriteBorder className="icon_like" fontSize="large"/> } checkedIcon={<Favorite fontSize="large"/>} name="checkedH" />}*/}
                    {/*    className="liked_pizza"*/}
                    {/*    onClick={this.addLikedPizza}*/}
                    {/*/>*/}
                        <div className="weigth__pizza"><p className="size_pizza_label">{currentSize.size} г</p></div>
                    </div>

                    <div className="info__pizza">
                        <p className="name__pizza">{name}</p> 
                        <p className="components__pizza">{components}</p>
                        <div className="size__pizza">
                            <div className={currentStyle.small ? "size__small active" : "size__small"} onClick={() => this.handleChangleSize(sizeAndPrice[0], "small")}>Маленька</div>
                            <div className={currentStyle.normal ? "size__normal active" : "size__normal"} onClick={() => this.handleChangleSize(sizeAndPrice[1], "normal")}>Середня</div>
                            <div className={currentStyle.big ? "size__big active" : "size__big"} onClick={() => this.handleChangleSize(sizeAndPrice[2], "big")}>Велика</div>
                        </div>

                        <div className="price__block">
                            <p className="price__pizza">{currentSize.price}<span>грн</span></p>
                            <div className="button__order__pizza" onClick={this.handleAddPizza}>
                                В кошик
                            </div>
                        </div>
                        {isValid && 
                        <div className="validation__block__pizza">
                            <Validation type={type} message={message} />
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
} 
export default connect(state=>({
    pizza: state.pizza,
    amount: state.amount
}),{addPizza, isAmount})(Pizza);