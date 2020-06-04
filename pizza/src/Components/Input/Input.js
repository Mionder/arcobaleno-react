import React, { Component } from "react";
import PropTypes from "prop-types";
import "./input.css";
export default class Input extends Component {
    render() {
        const {
            type, value, onChange, placeholder, className
        } = this.props;
        return (
            <div>
                <input className = "login__input"
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className = {className}
                />
            </div>
        );
    }
}