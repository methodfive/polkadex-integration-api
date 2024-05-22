const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES} = require("../constants");

async function getMarkets(transformer, defaultValue)
{
    console.log("getMarkets:");

    let connectionPool = null;
    let result = JSON.parse(JSON.stringify(defaultValue));

    try {
        connectionPool = await getConnection();

        await queryAsyncWithRetries(connectionPool,
            `
select markets_24h.*, a1.name as base_name, a1.real_name as base_real_name, a1.symbol as base_symbol, a2.name as quote_name, a2.real_name as quote_real_name, a2.symbol as quote_symbol, markets.price, max_bid.max_bid_price, min_ask.min_ask_price, a1.cmc_unified_id as base_cmc_id, a2.cmc_unified_id as quote_cmc_id
from markets 
join assets a1 on a1.asset_id = markets.base_asset_id 
join assets a2 on a2.asset_id = markets.quote_asset_id 
join markets_24h on markets_24h.base_asset_id = markets.base_asset_id and markets_24h.quote_asset_id = markets.quote_asset_id 
join (select max(price) as max_bid_price, base_asset_id, quote_asset_id from orderbook where side='Bid' group by base_asset_id, quote_asset_id) max_bid on max_bid.base_asset_id = markets.base_asset_id and max_bid.quote_asset_id = markets.quote_asset_id 
join (select min(price) as min_ask_price, base_asset_id, quote_asset_id from orderbook where side='Ask' group by base_asset_id, quote_asset_id) min_ask on min_ask.base_asset_id = markets.base_asset_id and min_ask.quote_asset_id = markets.quote_asset_id 
order by volume desc`,
            null,
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    if(rows[i].price_high === null)
                        rows[i].price_high = rows[i].price;
                    if(rows[i].price_low === null)
                        rows[i].price_low = rows[i].price;

                    if(JSON.stringify(defaultValue) === JSON.stringify([])) {
                        result.push(transformer(result, rows[i]));
                    }
                    else
                        result = transformer(result, rows[i]);
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getmarkets",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

module.exports = getMarkets;