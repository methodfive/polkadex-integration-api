/* eslint-disable consistent-return */
const express = require('express');
const getSupply = require("../../db/supply");
const transformCGSupply = require("../../transformers/coingecko/supply");
const router = express.Router();

/**
 * @api {get} /cg/v1/supply Get Supply
 * @apiName GetSupply
 * @apiGroup CoinGecko
 *
 * @apiSuccess {Number} result  Current circulating supply of PDEX (Polkadex Token)
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "result":7839710
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
    let supply = await getSupply(transformCGSupply);
    res.json(supply);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
