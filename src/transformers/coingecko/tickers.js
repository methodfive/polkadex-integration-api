const {isEmpty, generateTickerID, removeTrailingZeros} = require("../../util");

const transformCGTickers = (result, item) => {
    if(isEmpty(item))
        return;

    return {
        ticker_id: generateTickerID(item.base_symbol, item.quote_symbol), // mandatory
        base_currency: item.base_symbol, // mandatory
        target_currency: item.quote_symbol, // mandatory
        //pool_id: null, // mandatory
        last_price: removeTrailingZeros(item.price), // mandatory
        base_volume: removeTrailingZeros(item.volume_base), // mandatory
        target_volume: removeTrailingZeros(item.volume), // mandatory
        //liquidity_in_usd: null, // mandatory
        bid: removeTrailingZeros(item.max_bid_price), // recommended
        ask: removeTrailingZeros(item.min_ask_price), // recommended
        high: removeTrailingZeros(item.price_high), // recommended
        low: removeTrailingZeros(item.price_low), // recommended
    };
};

module.exports = transformCGTickers;