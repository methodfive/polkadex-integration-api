const {isEmpty, generateTickerID, removeTrailingZeros, calculatePercentageIncrease} = require("../../util");

const transformCMCSummary = (result, item) => {
    if(isEmpty(item))
        return;

    return {
        trading_pairs: generateTickerID(item.base_symbol, item.quote_symbol), // mandatory
        base_currency: item.base_symbol, // recommended
        quote_currency: item.quote_symbol, // recommended
        last_price: removeTrailingZeros(item.price), // mandatory
        lowest_ask: removeTrailingZeros(item.min_ask_price), // mandatory
        highest_bid: removeTrailingZeros(item.max_bid_price), // mandatory
        base_volume: removeTrailingZeros(item.volume_base), // mandatory
        quote_volume: removeTrailingZeros(item.volume), // mandatory
        price_change_percent_24h: calculatePercentageIncrease(item.price_24h, item.price), // mandatory
        highest_price_24h: removeTrailingZeros(item.price_high), // mandatory
        lowest_price_24h: removeTrailingZeros(item.price_low), // mandatory
    };
};

module.exports = transformCMCSummary;