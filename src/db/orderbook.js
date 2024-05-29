const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES, MAX_TRADE_RESULTS, MAX_ORDERBOOK_RESULTS} = require("../constants");
const {isEmpty, getMarketPairByTickerID} = require("../util");

async function getOrderBook(transformer, market, depth)
{
    console.log("getOrderBook:");

    let connectionPool = null;
    let result = [];

    try {
        connectionPool = await getConnection();

        let marketPair = getMarketPairByTickerID(market);

        if(isEmpty(depth))
            depth = MAX_ORDERBOOK_RESULTS;

        let updatedTS = await getOrderBookUpdateTS(connectionPool);
        let bids = await getOrderBookSide(connectionPool, marketPair.base, marketPair.quote, "Bid", depth);
        let asks = await getOrderBookSide(connectionPool, marketPair.base, marketPair.quote, "Ask", depth);

        result = transformer(market, updatedTS, bids, asks);
    }
    catch(e) {
        console.error("Error fetching getOrderBook",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

async function getOrderBookSide(connectionPool, baseAsset, quoteAsset, side, depth)
{
    let result = [];

    let sqlQuery = `
select stid, base_asset_id, quote_asset_id, orderbook.price, quantity, side 
from orderbook 
join assets assets_base on assets_base.asset_id = orderbook.base_asset_id  
join assets assets_quote on assets_quote.asset_id = orderbook.quote_asset_id  
where assets_base.symbol = ? and assets_quote.symbol = ? and side = ?
order by price
`;

    sqlQuery += side.localeCompare("Ask") ? "desc" : "asc";

    let variables = [baseAsset, quoteAsset, side];

    if (!isEmpty(depth) && depth !== 0)
    {
        sqlQuery += ` limit ?`;
        variables.push(Math.floor(Number(depth) / 2));
    }

    await queryAsyncWithRetries(connectionPool,
        sqlQuery,
        variables,
        ([rows,fields]) => {
        for(let i = 0; i < rows.length; i++)
        {
            result.push(rows[i]);
        }
        }, DB_RETRIES);

    return result;
}

async function getOrderBookUpdateTS(connectionPool)
{
    let result = null;

    await queryAsyncWithRetries(connectionPool,
        `select last_update from orderbook_lastupdate`,
        [],
        ([rows,fields]) => {
            for(let i = 0; i < rows.length; i++)
            {
                result = rows[i].last_update;
            }
        }, DB_RETRIES);

    return result;
}

module.exports = getOrderBook;