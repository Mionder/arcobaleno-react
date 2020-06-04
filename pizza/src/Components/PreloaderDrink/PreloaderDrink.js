import React, { Component } from 'react';
import './preloader.css';

export default class Preloader extends Component{
componentDidMount(){
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
          document.body.classList.add('loaded');
          document.body.classList.remove('loaded_hiding');
        }, 500);
      }

    // window.onload = function(){ 
    //     document.body.classList.add('loaded hiding');
    //     document.body.classList.add('loaded');
    // }
}

    render(){
        return(
            <div className="preloader">
                <div className="preloader__image"></div>
            </div>
        )
    }
}