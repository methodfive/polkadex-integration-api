const {isEmpty} = require("../../util");

const transformCMCAssets = (result, item) => {
    if(isEmpty(result) || isEmpty(item))
        return;

    result[item.symbol] = {
        unified_cryptoasset_id: item.cmc_unified_id, // recommended
        can_deposit: true, // recommended
        can_withdraw: true, // recommended
        //min_withdraw: "", // recommended
        //max_withdraw: "", // recommended
        name: isEmpty(item.real_name) ? item.name : item.real_name, // recommended
        maker_fee: "0.01", // recommended
        taker_fee: "0.01", // recommended
        //contractAddressUrl: "", // recommended
        //contractAddress: "" // recommended
    };
    return result;
};

module.exports = transformCMCAssets;