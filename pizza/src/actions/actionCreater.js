import sale from "../reducers/sale";

export const addPizza = (id,name,price,components,img,amount, sizeAndPrice) =>({
    type: 'ADD_PIZZA',
    id,
    name,
    price,
    components,
    img,
    amount,
    sizeAndPrice
});

export const addAmount = (amount,id, price) => ({
    type: 'ADD_AMOUNT',
    amount,
    price,
    id
});

export const subAmount = (amount,id,price) => ({
    type: 'SUB_AMOUNT',
    amount,
    price,
    id
});

export const deletePizza = (id,price) => ({
    type: 'DELETE_PIZZA',
    id,
    price
});

export const filterPizza = (id, price) => ({
    type: 'FILTER_PIZZA',
    id, 
    price
});

export const setUser = (name) => ({
    type: 'SET_USER',
    name
});

export const setSale = (id, img, sale_name, sale_text) =>({
    type: 'CURRENT_SALE',
    id,
    img, 
    sale_name,
    sale_text
});

export const isAmount = (amount) =>({
    type: 'AMOUNT',
    amount
});

export const setComponents = (component) => ({
    type: 'SET_COMPONENTS',
    component
})

export const unsetComponent = (component) => ({
    type: 'UNSET_COMPONENTS',
    component
})

export const setFullPrice = (price) =>({
    type: 'SET_FULL_PRICE',
    price
})

export const setBonus = (bonus) =>({
    type: 'BONUS',
    bonus
})

export const setOrderData = (address, pizzaName, amount, name) => ({
    type: "SET_ORDER_DATA",
    address,
    pizzaName,
    amount,
    name
})