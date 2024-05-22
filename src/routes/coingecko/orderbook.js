/* eslint-disable consistent-return */
const express = require('express');
const {validate, isEven, isEmpty} = require("../../util");
const yup = require("yup");
const {TICKER_REGEX} = require("../../constants");
const transformCGOrderBook = require("../../transformers/coingecko/orderbook");
const getOrderBook = require("../../db/orderbook");
const router = express.Router();

/**
 * @api {get} /cg/v1/orderbook Get OrderBook
 * @apiName GetOrderBook
 * @apiGroup CoinGecko
 *
 * @apiParam (Query string) {String} ticker_id A ticker such as "PDEX_USDT"
 * @apiParam (Query string) {Number} [depth] Orders depth quantity: [0,5,10,20,50,100,500]
 *
 *  Not defined or 0 = full order book
 *
 * Depth = 100 means 50 for each bid/ask side
 *
 * @apiSuccess {String} ticker_id A ticker such as "PDEX_USDT"
 * @apiSuccess {Number} timestamp Unix timestamp in milliseconds for when the last updated time occurred.
 * @apiSuccess bids  An array containing 2 elements. The offer price and quantity for each bid order.
 * @apiSuccess asks  An array containing 2 elements. The offer price and quantity for each bid order.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "ticker_id":"PDEX_USDT",
 *    "timestamp":1716034533,
 *    "bids":[
 *       [
 *          "0.6322000000",
 *          "8.6000000000"
 *       ],
 *       [
 *          "0.6297000000",
 *          "8.7000000000"
 *       ],
 *       ...
 *    ],
 *    "asks":[
 *       [
 *          "0.6342000000",
 *          "8.6000000000"
 *       ],
 *       [
 *          "0.6347000000",
 *          "8.6000000000"
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
    ticker_id: yup.string().required().matches(
        TICKER_REGEX,
        "Invalid ticker format. Use: BASE_QUOTE"),
    depth: yup.number().integer().min(0).max(500)
        .test(
        "evenOnly",
        "Depth must be even.",
        (value) => (isEmpty(value) || (typeof value === "number" && isEven(value)))
    )
  })
});

router.get('/', validate(schema),async (req, res, next) => {
  try {
    let ticker_id = req.query.ticker_id; // mandatory
    let depth = req.query.depth; // recommended

    let orderbook = await getOrderBook(transformCGOrderBook, ticker_id, depth, null);

    res.json(orderbook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
