/* eslint-disable consistent-return */
const express = require('express');
const getAssets = require("../../db/assets");
const transformAssets = require("../../transformers/core/assets");
const router = express.Router();

/**
 * @api {get} /v1/assets Get Assets
 * @apiName GetAssets
 * @apiGroup Core
 *
 * @apiSuccess {Number} asset_id  Polkadex asset ID
 * @apiSuccess {Number} cmc_id  CoinMarketCap ID of the cryptocurrency
 * @apiSuccess {Number} coingecko_id  CoinGecko ID of the cryptocurrency
 *
 */

router.get('/', async (req, res, next) => {
  try {
    let assets = await getAssets(transformAssets);
    res.json(assets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;