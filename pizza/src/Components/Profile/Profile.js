import React, { Component } from 'react';
import {setUser} from "../../actions/actionCreater";
import Axios from 'axios';
import {connect} from 'react-redux';
import './profile.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pizza from "../Pizza/Pizza";
import $ from "jquery";
import bonus1 from "./bonus1.png"
import bonus2 from "./bonus2.png"
import bonus3 from "./bonus3.png"
import bonus4 from "./bonus4.png"
import bonus5 from "./bonus5.png"
import bonus6 from "./bonus6.png";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
class Profile extends Component{
    state={
        users: [],
        isActive: false,
        pizza: [],
        nextBonus: localStorage.getItem("timeBonus"),
        curUser: {}
    }
    getUser = async () =>{
        await Axios.get(`http://localhost:3000/users/`).then((res)=>{
            this.setState({ users: res.data })   
        });
        console.log(this.state.users);
        const {users} = this.state;
        this.searchUser(users);
        // this.likedPizza(users.isLiked);
    }
      componentDidMount(){
         this.getUser();
        //  const {users, nextBonus} = this.state;
        // //  this.searchUser(users);
        // let date = new Date();
        // console.log(nextBonus!==date.getDate() , users.username, localStorage.getItem("username"));
        // if((nextBonus !== date.getDate())&&(users.username === localStorage.getItem("username"))){
        $(document).ready(function () {
            for (let i = 0; i < 3; i++) {
                $(".list li").clone().appendTo(".list");
            }
            $('.button').click(function () {
                $('.window').css({
                    right: "0"
                })
                $('.list li').css({
                    border: '4px solid transparent'
                })
                function selfRandom(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                var x = selfRandom(50, 100);
                $('.list li:eq('+x+')').css({
                    border:'4px solid #00ba00'
                })
                console.log($('.list li:eq('+x+')')[0].value); //value бонуса
                localStorage.setItem("value", ($('.list li:eq('+x+')')[0].value));
                $('.window').animate({
                    right: ((x*130)+(x*8-12)-119)
                }, 10000);
                
            });
        });
        // }
    }

    likedPizza = (arr) =>{
        let myPizza = [];
        arr.map(item =>{
            console.log(item);
            Axios.get(`http://localhost:3000/pizzas/${item}`).then((res)=>{
                myPizza.push(res.data);
                this.setState({pizza: myPizza});
            })
        });
        
    }

    renderPizza = (arr) =>{
        return arr.map(item =>{
            const {name,components,id,img, sizeAndPrice, _id} = item;
            console.log(item);
            return(
                    <div className="container" key={id}>  
                            <Pizza
                            name = {name}
                            components = {components}
                            src = {img}
                            id = {id}
                            _id = {_id}
                            sizeAndPrice = {sizeAndPrice}
                            />
                        
                    </div>
            )
        })
    }

    searchUser(arr){
        for(let i=0; i<arr.length;i++){
            const {username} = arr[i];
            const {user} = this.props;
            // console.table(username, user);
            if(username === user){
                this.setState({users: arr[i]});
            }
        }
        const {users} = this.state;
        this.likedPizza(users.isLiked);
    }
    // query = async (item) =>{
    //     await Axios.get(`http://localhost:3000/pizzas/${item}`).then(async(res)=>{
    //         console.log(res.data);
    //         await this.setState({
    //             likedPizza: res.data
    //         })
    //         console.table(this.state.likedPizza);
    //         // pizzaLike.push(res.data);
    //     }).catch(console.log('ALERT'))
        
    // }

    // likedPizza = (arr) =>{
    //     let pizzaArr;
    //     arr.forEach(async(item) =>{
    //        await this.query(item);
    //     })
    //     this.setState({
    //         likedPizza: pizzaArr
    //     })
    //     console.log(this.state.likedPizza);
    // }

    rouletteFunc = () => {
        const idUser = localStorage.getItem("id");
        const {users, nextBonus} = this.state;
        let date = new Date();
        console.log(nextBonus!==date.getDate() , users.username, localStorage.getItem("username"));
        if((nextBonus !== date.getDate())&&(users.username === localStorage.getItem("username"))){
        const rouletteBonus = localStorage.getItem("value");
                const {users} = this.state;
                users.bonuses += parseInt(rouletteBonus);
                Axios.put(`http://localhost:3000/users/${idUser}`, JSON.parse(JSON.stringify(users))).then((res)=>{
                console.log(res.data)
        })
        
        let date = new Date();
        const currentDate = date.getDate();
        localStorage.setItem("timeBonus", currentDate)
        }
        else alert("auf");
    }

    logOut = () =>{
        localStorage.setItem("id","");
        localStorage.setItem("username", "");
        const {setUser} = this.props;
        setUser("");
        this.props.history.push("/login");
    }

    roulette = () => {
        let role = [];
        role = document.getElementsByClassName("block__roulette");
        console.log(role);
        // role.forEach(element =>{
        // })
        for(let i=0; i<role.length; i++){
        role[i].classList.add("roling");
        }
    }
 
    render(){
        const {users, pizza, isActive} = this.state;
        localStorage.setItem("id", users._id);
        const items = this.renderPizza(pizza);
        const fixedBonus = parseFloat(users.bonuses).toFixed(2);
        // console.log(items);
        return(
          <div className="profile__wrapper">
              <div className="container">
                <div className="header__profile">
                    <span className="username__profile">Привіт, {users.username}</span>
                    <span className="bonuses__profile">Бонусів накопичено: {fixedBonus}</span>
                </div>
                <div className="liked__pizza">
                    <p className="label_liked_pizza">Твоя улюбленна піца</p>
                    <FavoriteIcon 
                    color="primary"
                    fontSize="large"
                    className="icon__favourite"
                    onClick={() => this.setState({isActive: !isActive})}
                    />
                </div>

                {isActive &&
                <div>
                    {items.length == 0 ? 
                    <div className="smile_block">
                        <SentimentVeryDissatisfiedIcon className="sad__smile"/> 
                        <p className="smile_label">Ви ще не додали жодної улюбленої піци</p>
                    </div>
                    :
                    <div className="box_liked_pizza"> 
                    {items }
                    </div>
                    }
                </div>  
                }
    
                

<div className="wraper">
        <div className="arrowup"></div>
        <div className="arrowdown"></div>
        <div className="window">
        <ul className="list">
            
        </ul>
            <ul className="list">
                <li value="10">
                    <img src={bonus1} alt=""/>
                    </li>
                <li value="5">
                    <img src={bonus2} alt=""/>
                   </li>
                <li value="20">
                    <img src={bonus3} alt=""/>
                    </li>
                <li value="2">
                    <img src={bonus4} alt=""/>
                    </li>
                <li value="50">
                    <img src={bonus5} alt=""/>
                    </li>
                <li value="1">
                    <img src={bonus6} alt=""/>
                    </li>
            </ul>
        </div>
    </div>
    <p ></p>
        <button className="button" id="roulette__button" onClick={this.rouletteFunc}>Отримати бонус</button>
        <div className="win">
            <ul>
                
            </ul>
        </div>


                    {/* <button className="start__roulette" onClick={this.roulette}>
                        Крутити
                    </button> */}
                <button className="log__out" onClick={this.logOut}> Вийти </button>
              </div>
          </div>  
        //   </div>  
        );
    }
}

export default connect(state =>({
    user: state.user
}),{setUser})(Profile)