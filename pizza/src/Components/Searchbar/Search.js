import React from 'react';
import { Component } from 'react';
import './search.css';

export default class SearchBar extends Component{
    render(){
        return(
            <div>
                <input type="text" className="search__input"/>
            </div>
        );
    }
}