const {isEmpty, removeTrailingZeros, generateTickerID} = require("../../util");

const transformCMCTicker = (result, item) => {
    if(isEmpty(item) || isEmpty(result))
        return;

    result[generateTickerID(item.base_symbol, item.quote_symbol)] = {
        base_id: item.base_cmc_id, // recommended
        quote_id: item.quote_cmc_id, // recommended
        base_currency: item.base_symbol,
        target_currency: item.quote_symbol,
        last_price: removeTrailingZeros(item.price), // mandatory
        base_volume: removeTrailingZeros(item.volume_base), // mandatory
        quote_volume: removeTrailingZeros(item.volume), // mandatory
        isFrozen: "0", // recommended
    };
    return result;
};

module.exports = transformCMCTicker;