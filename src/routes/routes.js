const cgTickers = require('./coingecko/tickers');
const cgOrderbook = require('./coingecko/orderbook');
const cgHistorical = require('./coingecko/historical');
const cgSupply = require('./coingecko/supply');
const cmcSummary = require('./coinmarketcap/summary');
const cmcAssets = require('./coinmarketcap/assets');
const cmcTicker = require('./coinmarketcap/ticker');
const cmcOrderbook = require('./coinmarketcap/orderbook');
const cmcTrades = require('./coinmarketcap/trades');
const assets = require('./core/assets');
const volume24h = require('./core/volume24h');
const volume = require('./core/volume');
const volumeRange = require('./core/volumeRange');

const initializeRoutes = app => {
    app.use('/cg/v1/tickers', cgTickers);
    app.use('/cg/v1/orderbook', cgOrderbook);
    app.use('/cg/v1/historical', cgHistorical);
    app.use('/cg/v1/supply', cgSupply);

    app.use('/cmc/v1/summary', cmcSummary);
    app.use('/cmc/v1/assets', cmcAssets);
    app.use('/cmc/v1/ticker', cmcTicker);
    app.use('/cmc/v1/orderbook', cmcOrderbook);
    app.use('/cmc/v1/trades', cmcTrades);

    app.use('/v1/assets', assets);
    app.use('/v1/volume24h', volume24h);
    app.use('/v1/volumeByRange', volumeRange);
    app.use('/v1/volume', volume);

    //app.use(express.static('docs'));
}

module.exports = initializeRoutes;