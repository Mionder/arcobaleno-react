const user = (state = localStorage.getItem("username"), {type, name}) => {
    switch(type){
        case 'SET_USER' :
            return name
        default: 
        return state
    }
}

export default user;