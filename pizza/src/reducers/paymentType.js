const paymentType = (state = "/cash", {type, typePay}) =>{
    switch(type){
        case 'PAYMENT_TYPE':
            return typePay;
        default: 
        return state;
    }
}

export default paymentType; 
