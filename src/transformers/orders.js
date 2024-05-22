const {isEmpty} = require("../util");

const transformOrders = item => {
    if(isEmpty(item))
        return;

    let result = [];
    for(let i = 0; i < item.length; i++)
    {
        result.push([item[i].price, item[i].quantity]);
    }

    return result;
};

module.exports = transformOrders;
