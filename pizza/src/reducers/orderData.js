const order = (state = {}, {type,address, pizzaName, amount, name}) =>{
    switch(type){
        case 'SET_ORDER_DATA':
            return {
                address,
                pizzaName,
                amount,
                name
            }
        default: 
        return state;
    }
}

export default order; 
