import React from 'react';
import { Component } from 'react';
import Axios from 'axios';
import Sale from '../Sale/Sale';

export default class Sales extends Component{
    state = {
        sales: []
    }
    componentDidMount(){
        this.getResourse();
    }
    getResourse = () =>{
        Axios.get("http://localhost:3000/sales").then((element)=>{
            this.setState({
                sales: element.data
            })
        console.log(this.state.sales);
        })
    }

    renderSales(arr){
        return arr.map(item =>{
            const {id,img,date,name,text} = item;
            return(
                <Sale 
                    key = {id}
                    id = {id}
                    img = {img}
                    date = {date}
                    name = {name}
                    info = {text}                
                />
            )
        })
    }

    render(){
        const items = this.renderSales(this.state.sales);
        return(
            <div>
                {items}
            </div>
        )
    }
}