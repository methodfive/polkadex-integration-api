/* eslint-disable consistent-return */
const express = require('express');
const yup = require("yup");
const {getVolume} = require("../../db/volume");
const moment = require("moment");
const transformVolume = require("../../transformers/core/volume");
const {validate} = require("../../util");
const router = express.Router();

/**
 * @api {get} /v1/volume Get Total Volume
 * @apiName getVolume
 * @apiGroup Core
 *
 * @apiSuccess {Number} stat_date  Date
 * @apiSuccess {Number} volume_usd  Volume in USD
 *
 */

const schema = yup.object({
  query: yup.object({
    stat_date: yup.date().required().transform(value => {
      return value ? moment(value).toDate() : value;
    })
  })
});

router.get('/', validate(schema), async (req, res, next) => {
  try {
    let stat_date = req.query.stat_date; // mandatory (for now)

    let volume = await getVolume(transformVolume, stat_date);
    res.json(volume);
  } catch (error) {
    next(error);
  }
});

module.exports = router;