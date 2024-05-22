/* eslint-disable consistent-return */
const express = require('express');
const getMarkets = require("../../db/markets");
const transformCGTickers = require("../../transformers/coingecko/tickers");
const router = express.Router();

/**
 * @api {get} /cg/v1/tickers Get Tickers
 * @apiName GetTickers
 * @apiGroup CoinGecko
 *
 * @apiSuccess {String} ticker_id  Identifier of a ticker with delimiter to separate base/target, eg. PDEX_USDT
 * @apiSuccess {String} base_currency  Symbol of the base asset, eg: PDEX
 * @apiSuccess {String} target_currency Symbol of the quote asset, eg: USDT
 * @apiSuccess {Number} last_price  Last transacted price of base currency based on given quote currency
 * @apiSuccess {Number} base_volume  24-hour trading volume denoted in BASE currency
 * @apiSuccess {Number} target_volume  24 hour trading volume denoted in QUOTE currency
 * @apiSuccess {Number} bid  Highest bid price of base currency based on given quote currency
 * @apiSuccess {Number} ask  Lowest Ask price of base currency based on given quote currency
 * @apiSuccess {Number} high  Highest price of base currency based on given quote currency in the last 24-hrs
 * @apiSuccess {Number} low  Lowest price of base currency based on given quote currency in the last 24-hrs
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *       "ticker_id":"DOT_USDT",
 *       "base_currency":"DOT",
 *       "target_currency":"USDT",
 *       "last_price":"7.186",
 *       "base_volume":"4268.1",
 *       "target_volume":"30755.7704",
 *       "bid":"7.161",
 *       "ask":"7.187",
 *       "high":"7.28",
 *       "low":"7.152"
 *    },
 *    {
 *       "ticker_id":"PDEX_USDT",
 *       "base_currency":"PDEX",
 *       "target_currency":"USDT",
 *       "last_price":"0.6325",
 *       "base_volume":"46874.466672788",
 *       "target_volume":"29703.654537",
 *       "bid":"0.631",
 *       "ask":"0.6333",
 *       "high":"0.6499",
 *       "low":"0.6193"
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
    let markets = await getMarkets(transformCGTickers, []);
    res.json(markets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
