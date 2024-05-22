const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES} = require("../constants");

async function getSupply(transformer)
{
    console.log("getSupply:");

    let connectionPool = null;
    let result = {};

    try {
        connectionPool = await getConnection();

        await queryAsyncWithRetries(connectionPool,
            `
select total_issuance, total_staked, treasury_balance 
from exchange_daily 
order by stat_date desc limit 1
`,
            null,
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    result = transformer(rows[i]);
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getSupply",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

module.exports = getSupply;