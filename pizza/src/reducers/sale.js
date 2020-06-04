const sale = (state ={}, {id,img,sale_name,sale_text, type}) =>{
    switch(type){
        case 'CURRENT_SALE':
            return {id,img,sale_name, sale_text}
        default: 
        return state;
    }
}

export default sale;