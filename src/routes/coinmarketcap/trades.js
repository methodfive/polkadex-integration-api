const express = require('express');
const yup = require("yup");
const getTrades = require("../../db/trades");
const transformCMCTrades = require("../../transformers/coinmarketcap/trades");
const {validate} = require("../../util");
const {MAX_TRADE_RESULTS, TICKER_REGEX} = require("../../constants");
const router = express.Router();

/**
 * @api {get} /cmc/v1/trades/:market_pair Get Trades
 * @apiName GetTrades
 * @apiGroup CoinMarketCap
 *
 * @apiParam {String} market_pair A market pair such as "PDEX_USDT"
 *
 * @apiSuccess {Number} trade_id Unique trade identifier
 * @apiSuccess {Number} price  Last transacted price of base currency based on given quote currency
 * @apiSuccess {Number} base_volume  Transaction amount in BASE currency.
 * @apiSuccess {Number} quote_volume  Transaction amount in QUOTE currency.
 * @apiSuccess {Number} timestamp  Unix timestamp in milliseconds for when the transaction occurred.
 * @apiSuccess {String} type  Used to determine whether or not the transaction originated as a buy or sell.
 *
 *   buy – Identifies an ask was removed from the order book.
 *
 *   sell – Identifies a bid was removed from the order book.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *       "trade_id":39358287,
 *       "price":"0.6293",
 *       "base_volume":"24.5",
 *       "quote_volume":"15.41785",
 *       "timestamp":1715996884,
 *       "type":"sell"
 *    },
 *    {
 *       "trade_id":39358093,
 *       "price":"0.6293",
 *       "base_volume":"9.9",
 *       "quote_volume":"6.23007",
 *       "timestamp":1715996812,
 *       "type":"buy"
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

const schema = yup.object({
  params: yup.object({
    market_pair: yup.string().required().matches(
        TICKER_REGEX,
        "Invalid ticker format. Use: BASE_QUOTE"
    ),
  }),
});

router.get('/:market_pair', validate(schema), async (req, res, next) => {
  try {
    const market_pair = req.params.market_pair;

    let trades = await getTrades(transformCMCTrades, market_pair, null, MAX_TRADE_RESULTS, null, null);

    res.json(trades);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
