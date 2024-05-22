/* eslint-disable consistent-return */
const express = require('express');
const getTrades = require("../../db/trades");
const {validate} = require("../../util");
const {MAX_TRADE_RESULTS, TICKER_REGEX} = require("../../constants");
const yup = require("yup");
const transformCGHistorical = require("../../transformers/coingecko/historical");
const router = express.Router();

/**
 * @api {get} /cg/v1/historical Get Historical Trades
 * @apiName GetHistorical
 * @apiGroup CoinGecko
 *
 * @apiParam {String} ticker_id A market pair such as "PDEX_USDT"
 * @apiParam {String} [type] To indicate nature of trade - buy/sell
 * @apiParam {Number} [limit] Number of historical trades to retrieve from time of query. [0, 200, 500...]. 0 returns full history.
 * @apiParam {Number} [start_time] Start time from which to query historical trades from
 * @apiParam {Number} [end_time] End time for historical trades query
 *
 * @apiSuccess {Number} trade_id Unique trade identifier
 * @apiSuccess {Number} price  Last transacted price of base currency based on given quote currency
 * @apiSuccess {Number} base_volume  Transaction amount in BASE currency.
 * @apiSuccess {Number} target_volume  Transaction amount in QUOTE currency.
 * @apiSuccess {Number} trade_timestamp  Unix timestamp in milliseconds for when the transaction occurred.
 * @apiSuccess {String} type  Used to determine the type of the transaction that was completed.
 *
 * buy – Identifies an ask that was removed from the order book.
 *
 * sell – Identifies a bid that was removed from the order book.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *       "trade_id":39433729,
 *       "price":"0.6322",
 *       "base_volume":"10.8",
 *       "target_volume":"6.82776",
 *       "trade_timestamp":1716035421,
 *       "type":"buy"
 *    },
 *    {
 *       "trade_id":39433624,
 *       "price":"0.6319",
 *       "base_volume":"23.5",
 *       "target_volume":"14.84965",
 *       "trade_timestamp":1716035377,
 *       "type":"sell"
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
    query: yup.object({
        ticker_id: yup.string().required().matches(
            TICKER_REGEX,
            "Invalid ticker format. Use: BASE_QUOTE"),
        type: yup.string().oneOf(["buy", "sell"]),
        limit: yup.number().integer().min(0).max(MAX_TRADE_RESULTS),
        start_time: yup.date(),
        end_time: yup.date()
    })
});

router.get('/', validate(schema),async (req, res, next) => {
  try {
    let ticker_id = req.query.ticker_id; // mandatory
    let type = req.query.type; // recommended
    let limit = req.query.limit; // recommended
    let startTime = req.query.start_time; // recommended
    let endTime = req.query.end_time; // recommended

    let trades = await getTrades(transformCGHistorical, ticker_id, type, limit, startTime, endTime);

    res.json(trades);
  } catch (error) {
    next(error);
  }
});

module.exports = router;