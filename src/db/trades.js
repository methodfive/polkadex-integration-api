const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES, MAX_TRADE_RESULTS} = require("../constants");
const {getMarketPairByTickerID, isNumber, isEmpty, convertBuySellToBidAsk} = require("../util");
const moment = require("moment");

async function getTrades(transformer, ticker_id, type, limit, startTime, endTime)
{
    console.log("getTrades:", ticker_id);

    if(isEmpty(limit))
        limit = MAX_TRADE_RESULTS;
    else
        limit = Number(limit);

    type = convertBuySellToBidAsk(type);

    let connectionPool = null;
    let result = [];

    let marketPair = getMarketPairByTickerID(ticker_id);

    try {
        connectionPool = await getConnection();

        let sqlQuery = `
select trade_id, trades.price, quantity, volume, timestamp, m_side from trades 
join assets b_asset on b_asset.asset_id = trades.base_asset_id 
join assets q_asset on q_asset.asset_id = trades.quote_asset_id 
where b_asset.symbol = ? and q_asset.symbol = ?
`;
        let variables = [marketPair.base, marketPair.quote];

        if (!isEmpty(type))
        {
            sqlQuery += ` and m_side = ? `;
            variables.push(type);
        }

        if (!isEmpty(startTime))
        {
            sqlQuery += ` and timestamp >= ? `;
            variables.push(moment.unix(Number(startTime)).toDate());
        }

        if (!isEmpty(endTime))
        {
            sqlQuery += ` and timestamp <= ? `;
            variables.push(moment.unix(Number(endTime)).toDate());
        }

        sqlQuery += `order by timestamp desc `;

        if (!isEmpty(limit) && isNumber(limit) && limit !== 0)
        {
            sqlQuery += `limit ?`;
            variables.push(Number(limit));
        }

        await queryAsyncWithRetries(connectionPool,
            sqlQuery,
            variables,
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    result.push(transformer(rows[i]));
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getTrades",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }
    return result;
}

module.exports = getTrades;