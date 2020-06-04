const amount = (state = true, {type,amount}) =>{
    switch(type){
        case 'AMOUNT':
            return amount;
        default: 
        return state;
    }
}

export default amount; 
