import {ADD_TASK} from '../constants';

const pizza = [
    {
        name: "Піца Техас",
        price: 87.99,
        components: "Кукурудза, Цибуля, Гриби, Ковбаски баварські, Моцарела, Соус Барбекю",
        id: "0",
        img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/03/%D0%A2%D0%B5%D1%85%D0%B0%D1%81_300dpi-min.jpg",
        amount: 1
    },
    {
        name: "Піца Маргарита",
        price: 87.99,
        components: "Моцарела, Соус Domino's",
        id: "1",
        img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/04/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_300dpi-min.jpg",
        amount: 1
    },
    {
        name: "Піца Гавайська",
        price: 119.99,
        components: "Курка, Ананас, Моцарела, Соус Domino's",
        id: "2",
        img: "https://media.dominos.ua/menu/product_osg_image_category/2019/10/04/%D0%93%D0%B0%D0%B2%D0%B0%D0%B9%D1%81%D1%8C%D0%BA%D0%B0_300dpi-min.jpg",
        amount: 1
    }
];
const pizzas = (state =[], {type,id,name,price,components,img,amount,size, sizeAndPrice}) =>{
    switch(type){
        case 'ADD_PIZZA' :
            return[
                ...state,{
                    id,
                    name,
                    price,
                    components,
                    img,
                    amount,
                    sizeAndPrice
                }
            ];
        case 'ADD_AMOUNT' :
            return[...state].map(item => {
                console.log(item.id + ' ' + id);
                if((item.id === id)&&(item.price === price)){
                    item.amount++;
                }
                return item;
            });
        case 'SUB_AMOUNT' :
            return[...state].map(item => {
                console.log(item.id + ' ' + id);
                if((item.id === id)&&(item.price === price)){
                    if(item.amount > 1){
                        item.amount--;
                    }      
                }
                return item;
            });
        case 'DELETE_PIZZA' :
            return [...state].filter(pizza => pizza.id !== id);
        case 'FILTER_PIZZA' :
            return [...state].sort();
        default: 
        return state;
    }
}
export default pizzas;