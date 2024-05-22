/* eslint-disable consistent-return */
const express = require('express');
const getMarkets = require("../../db/markets");
const transformSummary = require("../../transformers/coinmarketcap/summary");
const router = express.Router();

/**
 * @api {get} /cmc/v1/summary Get Summary
 * @apiName GetSummary
 * @apiGroup CoinMarketCap
 *
 * @apiSuccess {String} trading_pairs Identifier of a ticker with delimiter to separate base/quote, eg. PDEX_USDT
 * @apiSuccess {String} base_currency  Symbol/currency code of base currency, eg. PDEX
 * @apiSuccess {String} quote_currency  Symbol/currency code of quote currency, eg. USDT
 * @apiSuccess {Number} last_price  Last transacted price of base currency based on given quote currency
 * @apiSuccess {Number} lowest_ask  Lowest Ask price of base currency based on given quote currency
 * @apiSuccess {Number} highest_bid  Highest bid price of base currency based on given quote currency
 * @apiSuccess {Number} base_volume  24-hr volume of market pair denoted in BASE currency
 * @apiSuccess {Number} quote_volume  24-hr volume of market pair denoted in QUOTE currency
 * @apiSuccess {Number} price_change_percent_24h  24-hr % price change of market pair
 * @apiSuccess {Number} highest_price_24h  Highest price of base currency based on given quote currency in the last 24-hrs
 * @apiSuccess {Number} lowest_price_24h  Lowest price of base currency based on given quote currency in the last 24-hrs
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *       "trading_pairs":"DOT_USDT",
 *       "base_currency":"DOT",
 *       "quote_currency":"USDT",
 *       "last_price":"7.193",
 *       "lowest_ask":"7.194",
 *       "highest_bid":"7.175",
 *       "base_volume":"4267.2",
 *       "quote_volume":"30750.7994",
 *       "price_change_percent_24h":"-0.24962",
 *       "highest_price_24h":"7.28",
 *       "lowest_price_24h":"7.152"
 *    },
 *    {
 *       "trading_pairs":"PDEX_USDT",
 *       "base_currency":"PDEX",
 *       "quote_currency":"USDT",
 *       "last_price":"0.6318",
 *       "lowest_ask":"0.6332",
 *       "highest_bid":"0.6307",
 *       "base_volume":"46876.866672788",
 *       "quote_volume":"29708.058327",
 *       "price_change_percent_24h":"-1.01833",
 *       "highest_price_24h":"0.6499",
 *       "lowest_price_24h":"0.6193"
 *    },
 *    ...
 * ]
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
    let markets = await getMarkets(transformSummary, []);
    res.json(markets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
