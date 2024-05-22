const {isEmpty} = require("../../util");
const moment = require("moment");
const transformOrders = require("../orders");

const transformCGOrderBook = (market, updatedTS, bids, asks) => {
    if(isEmpty(market) || isEmpty(updatedTS) || isEmpty(bids) || isEmpty(asks))
        return;

    return {
        ticker_id: market, // mandatory
        timestamp: moment.utc(updatedTS).unix(), // recommended
        bids: transformOrders(bids), // mandatory
        asks: transformOrders(asks), // mandatory
    };
};

module.exports = transformCGOrderBook;
