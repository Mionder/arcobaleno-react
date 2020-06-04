const myComponents = (state = [], {type,component}) =>{
    switch(type){
        case 'SET_COMPONENTS':
            return [...state,  component];
        case 'UNSET_COMPONENTS':
            return ""
        default: 
        return state ;
    }
}

export default myComponents; 
