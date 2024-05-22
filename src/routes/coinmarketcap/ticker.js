/* eslint-disable consistent-return */
const express = require('express');
const getMarkets = require("../../db/markets");
const transformCMCTicker = require("../../transformers/coinmarketcap/ticker");
const router = express.Router();

/**
 * @api {get} /cmc/v1/ticker Get Tickers
 * @apiName GetTickers
 * @apiGroup CoinMarketCap
 *
 * @apiSuccess {Number} base_id  The base pair Unified Cryptoasset ID.
 * @apiSuccess {Number} quote_id The quote pair Unified Cryptoasset ID.
 * @apiSuccess {Number} last_price  Last transacted price of base currency based on given quote currency
 * @apiSuccess {Number} base_volume  24-hour trading volume denoted in BASE currency
 * @apiSuccess {Number} quote_volume  24 hour trading volume denoted in QUOTE currency
 * @apiSuccess {Number} isFrozen  Indicates if the market is currently enabled (0) or disabled (1).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "PDEX_USDT":{
 *       "base_id":"9017",
 *       "quote_id":"825",
 *       "base_currency":"PDEX",
 *       "target_currency":"USDT",
 *       "last_price":"0.6285",
 *       "base_volume":"45106.260217025",
 *       "quote_volume":"28714.57237",
 *       "isFrozen":"0"
 *    },
 *    "GLMR_USDT":{
 *       "base_id":"6836",
 *       "quote_id":"825",
 *       "base_currency":"GLMR",
 *       "target_currency":"USDT",
 *       "last_price":"0.27448",
 *       "base_volume":"85818.7",
 *       "quote_volume":"23429.174977",
 *       "isFrozen":"0"
 *    },
 *    ...
 * }
 *
 * @apiErrorExample ValidationError:
 * HTTP/1.1 500
 * {
 *    "type":"ValidationError",
 *    "message":""
 * }
 * @apiErrorExample Error:
 * HTTP/1.1 500
 * {
 *    "type":"Error",
 *    "message":""
 * }
 */

router.get('/', async (req, res, next) => {
  try {
    let markets = await getMarkets(transformCMCTicker, {});
    res.json(markets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
