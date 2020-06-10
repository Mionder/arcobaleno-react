const maxPrice = (state = 290, { type, price }) => {
    switch (type) {
    case "MAX_PRICE":
        return price;
    default:
        return state;
    }
};

export default maxPrice;
