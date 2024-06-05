const {getConnection, queryAsyncWithRetries, releaseConnection} = require("./database");
const {DB_RETRIES} = require("../constants");

async function getVolume24h()
{
    console.log("getVolume24h:");

    let connectionPool = null;
    let result = {};

    try {
        connectionPool = await getConnection();
        
        await queryAsyncWithRetries(connectionPool,
            `
select volume as volume_usd from exchange_24h
`,
            null,
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    result = rows[i];
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getVolume24h",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

async function getVolume(transformVolume, stat_date)
{
    if(stat_date === null)
        return null;

    console.log("getVolume:");

    let connectionPool = null;
    let result = {};

    try {
        connectionPool = await getConnection();

        await queryAsyncWithRetries(connectionPool,
            `
select stat_date, volume from exchange_daily where stat_date = ?
`,
            [stat_date],
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    result = transformVolume(rows[i]);
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getVolume",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

async function getVolumeByRange(start_date, end_date)
{
    if(start_date === null || end_date === null)
        return null;

    console.log("getVolumeByRange:");

    let connectionPool = null;
    let result = {};

    try {
        connectionPool = await getConnection();

        await queryAsyncWithRetries(connectionPool,
            `
select sum(volume) as volume_usd from trades where timestamp between ? and ?
`,
            [new Date(start_date * 1000), new Date(end_date * 1000)],
            ([rows,fields]) => {
                for(let i = 0; i < rows.length; i++)
                {
                    console.log(rows[i]);
                    result = rows[i];
                }
            },
            DB_RETRIES);
    }
    catch(e) {
        console.error("Error fetching getVolume",e);
    }
    finally
    {
        releaseConnection(connectionPool);
    }

    return result;
}

module.exports = {getVolume24h, getVolume, getVolumeByRange};