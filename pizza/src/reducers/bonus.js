const bonus = (state = 0, {type,bonus}) =>{
    switch(type){
        case 'BONUS':
            return bonus;
        default: 
        return state;
    }
}

export default bonus; 
