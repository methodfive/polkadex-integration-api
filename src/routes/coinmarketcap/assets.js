/* eslint-disable consistent-return */
const express = require('express');
const getAssets = require("../../db/assets");
const transformCMCAssets = require("../../transformers/coinmarketcap/assets");
const router = express.Router();

/**
 * @api {get} /cmc/v1/assets Get Assets
 * @apiName GetAssets
 * @apiGroup CoinMarketCap
 *
 * @apiSuccess {String} name Full name of cryptocurrency.
 * @apiSuccess {Number} unified_cryptoasset_id  Unique ID of cryptocurrency assigned by Unified Cryptoasset ID.
 * @apiSuccess {Boolean} can_withdraw  Identifies whether withdrawals are enabled or disabled.
 * @apiSuccess {Boolean} can_deposit  Identifies whether deposits are enabled or disabled.
 * @apiSuccess {Number} maker_fee  Fees applied when liquidity is added to the order book.
 * @apiSuccess {Number} taker_fee  Fees applied when liquidity is removed from the order book.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "PDEX":{
 *       "unified_cryptoasset_id":"9017",
 *       "can_deposit":true,
 *       "can_withdraw":true,
 *       "name":"Polkadex",
 *       "maker_fee":"0.01",
 *       "taker_fee":"0.01"
 *    },
 *    "DOT":{
 *       "unified_cryptoasset_id":"6636",
 *       "can_deposit":true,
 *       "can_withdraw":true,
 *       "name":"Polkadot",
 *       "maker_fee":"0.01",
 *       "taker_fee":"0.01"
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

/**
 * @apiGroup Errors
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
    let assets = await getAssets(transformCMCAssets);
    res.json(assets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
