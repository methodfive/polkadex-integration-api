const mysql2 = require("mysql2");

let connectionPool = null;

async function getConnection()
{
    if (connectionPool == null)
        await createConnectionPool();

    return connectionPool;
}

function releaseConnection(conn)
{
}

async function createConnectionPool() {
    connectionPool = mysql2.createPool({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        database: process.env.MYSQL_DB,
        password: process.env.MYSQL_DB_PASSWORD,
        ssl: {rejectUnauthorized: false},
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        timezone: 'Z',
    });

    return connectionPool;
}

async function queryAsyncWithRetries(connectionPool, sql, params, then, retries_left = 1) {
    return connectionPool.promise().query(sql, params)
        .then(then)
        .catch((err) => {
            if (retries_left >= 1 && (err.code === 'ECONNRESET' || err.code === 'EPIPE')) {
                console.error({msg: 'Retrying query', retries_left, err})
                return queryAsyncWithRetries(connectionPool, sql, params, then,retries_left - 1)
            } else {
                throw err
            }
        }
    );
}

module.exports = { getConnection, releaseConnection, queryAsyncWithRetries };