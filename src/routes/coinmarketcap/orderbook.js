/* eslint-disable consistent-return */
const express = require('express');
const {validate, isEmpty, isEven} = require("../../util");
const yup = require("yup");
const {TICKER_REGEX} = require("../../constants");
const getOrderBook = require("../../db/orderbook");
const transformCMCOrderBook = require("../../transformers/coinmarketcap/orderbook");
const router = express.Router();

/**
 * @api {get} /cmc/v1/orderbook/:market_pair Get OrderBook
 * @apiName GetOrderBook
 * @apiGroup CoinMarketCap
 *
 * @apiParam {String} market_pair A market pair such as "PDEX_USDT"
 * @apiParam (Query string) {Number} [depth] Orders depth quantity: [0,5,10,20,50,100,500]
 *
 *  Not defined or 0 = full order book
 *
 * Depth = 100 means 50 for each bid/ask side
 * @apiParam (Query string) {Number} [level]  Level 1 – Only the best bid and ask.
 *
 *   Level 2 – Arranged by best bids and asks.
 *
 * @apiSuccess {Number} timestamp Unix timestamp in milliseconds for when the last updated time occurred.
 * @apiSuccess bids  An array containing 2 elements. The offer price and quantity for each bid order.
 * @apiSuccess asks  An array containing 2 elements. The offer price and quantity for each bid order.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "timestamp":1715993913,
 *    "bids":[
 *       [
 *          "0.6274000000",
 *          "8.7000000000"
 *       ],
 *       [
 *          "0.6265000000",
 *          "8.7000000000"
 *       ],
 *       ...
 *    ],
 *    "asks":[
 *       [
 *          "0.6299000000",
 *          "8.7000000000"
 *       ],
 *       [
 *          "0.6308000000",
 *          "8.7000000000"
 *       ],
 *       ...
 *    ]
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

const schema = yup.object({
  query: yup.object({
    depth: yup.number().integer().min(0).max(500)
        .test(
            "evenOnly",
            "Depth must be even.",
            (value) => (isEmpty(value) || (typeof value === "number" && isEven(value)))
        ),
    level: yup.number().integer().min(1).max(3).test(
        "noThree",
        "No aggregation is not supported at this time.",
        (value) => (isEmpty(value) || (typeof value === "number" && value != 3))
    ),
  }),
  params: yup.object({
    market_pair: yup.string().required().matches(
        TICKER_REGEX,
        "Invalid ticker format. Use: BASE_QUOTE"
    ),
  }),
});

router.get('/:market_pair', validate(schema),async (req, res, next) => {
  try {
    const { market_pair } = req.params; // mandatory
    let depth = req.query.depth; // recommended
    let level = req.query.level; // recommended

    if(level == 1)
      depth = 2;

    let orderbook = await getOrderBook(transformCMCOrderBook, market_pair, depth);

    res.json(orderbook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
