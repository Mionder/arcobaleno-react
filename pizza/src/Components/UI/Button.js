import React from "react";
import PropTypes from "prop-types";
const Button = ({content, className, onClick, id}) => {
    return(
        <button className={className} onClick={onClick} id={id}>{content}</button>
    )
}
export default Button;

Button.propTypes = {
    content: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.string,
}

Button.defaultProps = {
    content: "",
    className: "",
    onClick: null,
    id: "",
}