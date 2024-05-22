const {isEmpty} = require("../../util");

const transformCGSupply = item => {
    if(isEmpty(item))
        return;

    return {
        result: Number(item.total_issuance) - Number(item.treasury_balance) - Number(item.total_staked), // mandatory
    };
};

module.exports = transformCGSupply;
