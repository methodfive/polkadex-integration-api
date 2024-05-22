const util = require("util");
const moment = require("moment");

function isEmpty(e) {
    return e == null || e.length === 0;
}

function isNumber(n){
    return Number(n) === n;
}

function generateTickerID(base, quote){
    if(isEmpty(base) || isEmpty(quote))
        return null;

    return util.format("%s_%s", base, quote);
}

function isEven(value) {
    if (value % 2 === 0)
        return true;
    else
        return false;
}

function getMarketPairByTickerID(tickerID){
    if(isEmpty(tickerID))
        return null;

    if(tickerID.indexOf("_") === -1)
        return null;

    let p = tickerID.split("_");
    return {base: p[0].trim(), quote: p[1].trim()}
}

function toUnixTimestamp(date) {
    if(date === null)
        return date;

    return moment(date).unix();
}

function convertBidAskToBuySell(type)
{
    if(isEmpty(type))
        return null;

    return type.localeCompare("Ask") == 0 ? "sell" : "buy"
}

function convertBuySellToBidAsk(type)
{
    if(isEmpty(type))
        return null;

    return type.localeCompare("buy") == 0 ? "Bid" : "Ask"
}

function removeTrailingZeros(value) {
    if(isEmpty(value))
        return value;

    value = value.toString();

    if (value.indexOf('.') === -1) {
        return value;
    }

    while((value.slice(-1) === '0' || value.slice(-1) === '.') && value.indexOf('.') !== -1) {
        value = value.substr(0, value.length - 1);
    }
    return value;
}

function calculatePercentageIncrease(oldValue, newValue) {
    if(isEmpty(oldValue))
        oldValue = 0;
    if(isEmpty(newValue))
        newValue = 0;

    let percent;
    if(newValue !== 0) {
        if(oldValue !== 0) {
            percent = (newValue - oldValue) / oldValue * 100;
        } else {
            percent = newValue * 100;
        }
    } else {
        percent = -oldValue * 100;
    }

    let options = {
        maximumFractionDigits: 5,
        roundingMode: 'floor'
    };

    const formatter = Intl.NumberFormat("en-US", options);
    return formatter.format(percent);
}

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    }
};

module.exports = { isEmpty, isNumber, isEven,
    generateTickerID, getMarketPairByTickerID, calculatePercentageIncrease,
    removeTrailingZeros, toUnixTimestamp, validate, convertBidAskToBuySell, convertBuySellToBidAsk}