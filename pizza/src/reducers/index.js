import {combineReducers} from 'redux';
import pizza from  './pizza';
import user from './user';
import sale from './sale';
import amount from './amount';
import components from './components';
import price from './price';
import bonus from './bonus';
import order from './orderData';
import maxPrice from "./maxPrice";

export default combineReducers({
    pizza,
    user,
    sale,
    amount,
    components,
    price,
    bonus,
    order,
    maxPrice
});

