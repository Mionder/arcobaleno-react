import React from 'react';
import { Component } from 'react';
import CustomizedSlider from '../Slider/Slider';
import CheckBox from '../Checkbox/Checkbox';
import SearchBar from '../Searchbar/Search';
import './filter.css';

export default class Filter extends Component{
    render(){
        return(
            <div className="search__panel filter__container">
                <div className="left__side__search">
                     <CustomizedSlider />   
                     <CheckBox />
                </div>
                <div className="right__side__search">
                     <SearchBar />
                </div>
            </div>
        );
    }
}