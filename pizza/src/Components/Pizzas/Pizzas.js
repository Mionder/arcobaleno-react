import React, { Component } from 'react';
import axios from 'axios';
import Pizza from '../Pizza/Pizza';
import "./pizzas.css";
import Preloader from '../Preloader/Preloaders';
import {connect} from 'react-redux';
import {filterPizza, setComponents, maxPrice} from '../../actions/actionCreater';
import Checkbox from '../Checkbox/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Slider from "../Slider/Slider";

class Pizzas extends Component{
    
    state = {
        pizzas: [],
        error: false,
        isReady: false,
        value: "",
        isShowFilter: false
    }

    componentDidMount(){
        this.onPizzaGet(); 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        // this.onPizzaGet(this.state.value)
    }

    onPizzaGet(){
        axios.get("http://localhost:3000/pizzas")
        .then((elem)=>{
            const res = elem.data;
            console.log(res);
            this.setState({
                pizzas: res,
                error: false,
                isReady: true
            })
        })
        .catch(this.onError)
    }

    onPizzaSuccess(pizza){
        console.log(1);
        this.setState({
            pizzas: pizza,
            error: false
        })
        
    }

    onError(){
        // this.setState({
        //     error: true
        // })
        console.log("error");
    }

    

    onPizzaRender(arr){
        const {myComponents} = this.props;
        let componentsString=""
            myComponents.forEach(element => {
                console.log(element);
            
            componentsString += element + ", ";
            console.log(componentsString);
            });
       return arr.map(item =>{
            const {name,components,id,img, sizeAndPrice, _id} = item;
            const {value} = this.state;
            const {myComponents, maxPriceValue} = this.props;
            if(value === "" && maxPriceValue === 290){
                return(
                    <div className="container" key={id}>  
                            <Pizza
                            name = {name}
                            components = {components}
                            src = {img}
                            id = {id}
                            sizeAndPrice = {sizeAndPrice}
                            _id={_id}
                            />
                        
                    </div>
                )
            }
            if(maxPriceValue > sizeAndPrice[0].price && value === ""){
                return(
                        <div className="container" key={id}>  
                                        <Pizza
                                        name = {name}
                                        components = {components}
                                        src = {img}
                                        id = {id}
                                        sizeAndPrice = {sizeAndPrice}
                                        _id={_id}
                                        />
                                    
                                </div>
                            )
            }
            if(maxPriceValue > sizeAndPrice[0].price && name.toLowerCase().includes(value)){
                return(
                    <div className="container" key={id}>  
                        <Pizza
                        name = {name}
                        components = {components}
                        src = {img}
                        id = {id}
                        sizeAndPrice = {sizeAndPrice}
                        _id={_id}
                        />
                    
                    </div>
                )
            }
            // else{
            //     if(value === ""){
            //         if((maxPriceValue > sizeAndPrice[0].price)){
            //             return(
            //                 <div className="container" key={id}>  
            //                         <Pizza
            //                         name = {name}
            //                         components = {components}
            //                         src = {img}
            //                         id = {id}
            //                         sizeAndPrice = {sizeAndPrice}
            //                         _id={_id}
            //                         />
                                
            //                 </div>
            //             )  
            //         }
            //     }
            //     if(value !== ""){
            //         if((maxPriceValue > sizeAndPrice[0].price)&&(name.toLowerCase().includes(value))){
            //             return(
            //                 <div className="container" key={id}>  
            //                         <Pizza
            //                         name = {name}
            //                         components = {components}
            //                         src = {img}
            //                         id = {id}
            //                         sizeAndPrice = {sizeAndPrice}
            //                         _id={_id}
            //                         />
                                
            //                 </div>
            //             )
            //         }
            //     }
            //     // if((maxPriceValue > sizeAndPrice[0].price)&&(value === "")){
            //     //     return(
            //     //         <div className="container" key={id}>  
            //     //                 <Pizza
            //     //                 name = {name}
            //     //                 components = {components}
            //     //                 src = {img}
            //     //                 id = {id}
            //     //                 sizeAndPrice = {sizeAndPrice}
            //     //                 _id={_id}
            //     //                 />
                            
            //     //         </div>
            //     //     )
            //     // }
            //     // else {
            //     //     if((maxPriceValue > sizeAndPrice[0].price)&&(value !== "")&&(name.toLowerCase().includes(value))){
            //     //         return(
            //     //             <div className="container" key={id}>  
            //     //                     <Pizza
            //     //                     name = {name}
            //     //                     components = {components}
            //     //                     src = {img}
            //     //                     id = {id}
            //     //                     sizeAndPrice = {sizeAndPrice}
            //     //                     _id={_id}
            //     //                     />
                                
            //     //             </div>
            //     //         )
            //     //     }
            //     // }
                
            // }

            // if((value !== "")&&(name.toLowerCase().includes(value))){
            //     return(
            //         <div className="container" key={id}>  
            //                 <Pizza
            //                 name = {name}
            //                 components = {components}
            //                 src = {img}
            //                 id = {id}
            //                 sizeAndPrice = {sizeAndPrice}
            //                 _id={_id}
            //                 />
                        
            //         </div>
            //     )
            // }

        })
    }
    render(){
        const {pizzas, isReady, isShowFilter} = this.state;
        const {newPizza, components, setComponents} = this.props;
        const items = this.onPizzaRender(pizzas);
        return(
            <div>{!isReady && <Preloader />}
                <div className="best__pizza__block">
                    <div className="filter_panel">
                        <h4 className=" filter">Знайди свою улюблену піцу</h4>
                        {!isShowFilter &&
                        <AddIcon onClick={()=>this.setState({isShowFilter: !isShowFilter})} fontSize="large"  className="filter_icon"/>
                        }
                        {
                            isShowFilter && <RemoveIcon onClick={()=>this.setState({isShowFilter: !isShowFilter})} fontSize="large"  className="filter_icon" />
                        }
                        
                    </div>
                    { isShowFilter && 
                    <div className="search_and_filter">

                    <div className="checking_panel">
                        
                        <div className="wrapper_checking">
                    
                        <div className="inputs_search">
                        <p className="find_pizza_label">Знайди піцу за назвою</p>
                        <input type="text" className="search__input" value={this.state.value} onChange={this.handleChange}/>
                    </div></div></div>
                        <div className="price__filtration">
                            <p className="find_pizza_label">Фільтрація за ціною</p>
                            <Slider />
                        </div>
                    
                    </div>}
                    {/* <FilterPanel /> */}
                    {/* <select value={this.state.value} onChange={this.handleChange}>
                        <option value="up">За зростанням</option>
                        <option value="down">За спаданням</option>
                        <option value=""></option>

                    </select> */}
                    <h2 className="pizza__best">Найпопулярніша піца</h2>
                    <div className="pizza__full__block">
                    {/* {items} */}
                    {items.length == 0 ? <div className="smile_block">
                    <SentimentVeryDissatisfiedIcon className="sad__smile"/> 
                    <p className="smile_label">Ви ще не додали жодної піци до корзини</p>
                    </div> : items}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state =>({
    newPizza: state.newPizza,
    myComponents: state.components,
    maxPriceValue: state.maxPrice
}),{filterPizza, setComponents, maxPrice})(Pizzas);