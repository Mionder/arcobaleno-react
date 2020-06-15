import React, { Component } from 'react';
import Axios from 'axios';
import Drink from '../Drink/Drink';
import PreloaderDrink from "../PreloaderDrink/PreloaderDrink";
import "./drinks.css";
export default class Drinks extends Component{
    state = {
        drink: [],
        error: false,
        loading: true,
        isReady: false
    }

    componentDidMount(){    
        Axios.get("http://localhost:3000/drinks")
        .then((elem)=>{
            const res = elem.data;
            this.setState({
                drink: res,
                error: false,
                isReady: true
            })
        })
        .catch(this.onError)
    }
    
    onError = () =>{
        console.log("error");
        this.setState({
            loading: false
        })
    }

    onDrinkRender(arr){
        return arr.map(item =>{
            const {name, id, sizeAndPrice,img,type} = item;
            return(
                <div className="container">
                    <Drink 
                        key = {id}
                        name = {name}
                        id = {id}
                        img = {img}
                        type = {type}
                        sizeAndPrice = {sizeAndPrice}
                    />
                </div>
            )
        })
    }

    render(){
        const {drink, loading,isReady} = this.state;
        // if(loading !== false){
        //     this.onLoading();
        // }
        const items = this.onDrinkRender(drink);
        return(
            <div>{!isReady && <PreloaderDrink />}
                <div className="best__pizza__block">
                    <h2 className="pizza__best">Вода</h2>
                    <div className="pizza__full__block">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}