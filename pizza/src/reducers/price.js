const price = (state = 0, {type,price}) =>{
    switch(type){
        case 'SET_FULL_PRICE':
            return price;
        default: 
        return state;
    }
}

export default price; 
