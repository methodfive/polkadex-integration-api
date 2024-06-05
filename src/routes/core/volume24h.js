/* eslint-disable consistent-return */
const express = require('express');
const {getVolume24h} = require("../../db/volume");
const router = express.Router();

/**
 * @api {get} /v1/volume24 Get 24H Volume
 * @apiName getVolume24
 * @apiGroup Core
 *
 * @apiSuccess {Number} volume_usd  Volume in USD
 *
 */

router.get('/', async (req, res, next) => {
  try {
    let volume = await getVolume24h();
    res.json(volume);
  } catch (error) {
    next(error);
  }
});

module.exports = router;