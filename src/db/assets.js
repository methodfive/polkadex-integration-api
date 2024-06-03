const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES} = require("../constants");

async function getAssets(transformer)
{
    console.log("getAssets:");

    let connectionPool = null;
    let result = {};

    try {
        connectionPool = await getConnection();
        
        await queryAsyncWithRetries(connectionPool,
            `
select assets.symbol, assets.name, assets.real_name, assets.cmc_unified_id, assets.coingecko_id, assets_24h.* 
from assets 
join assets_24h on assets_24h.asset_id = assets.asset_id 
order by tvl desc 
`,
            null,
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    result = transformer(result, rows[i]);
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getAssets",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

module.exports = getAssets;