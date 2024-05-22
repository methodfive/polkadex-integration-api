const {isEmpty, removeTrailingZeros, toUnixTimestamp, convertBidAskToBuySell} = require("../../util");

const transformCMCTrades = item => {
    if(isEmpty(item))
        return;

    return {
        trade_id: item.trade_id, // mandatory
        price: removeTrailingZeros(item.price), // mandatory
        base_volume: removeTrailingZeros(item.quantity), // mandatory
        quote_volume: removeTrailingZeros(item.volume), // mandatory
        timestamp: toUnixTimestamp(item.timestamp), // mandatory
        type: convertBidAskToBuySell(item.m_side), // mandatory
    };
};

module.exports = transformCMCTrades;