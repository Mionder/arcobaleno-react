import React from "react";

const Input = ({id,className,onChange, placeholder, type ,min, value}) => {
    return(
        <input type={type} id={id} className={className} min={min} value={value} onChange={onChange} placeholder={placeholder}/>
    )
}
export default Input;