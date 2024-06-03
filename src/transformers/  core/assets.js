const {isEmpty} = require("../../util");

const transformAssets = (result, item) => {
    if(isEmpty(result) || isEmpty(item))
        return;

    result[item.symbol] = {
        cmc_id: item.cmc_unified_id,
        coingecko_id: item.coingecko_id,
    };
    return result;
};

module.exports = transformAssets;