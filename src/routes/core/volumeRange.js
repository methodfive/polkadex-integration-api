/* eslint-disable consistent-return */
const express = require('express');
const {getVolumeByRange} = require("../../db/volume");
const yup = require("yup");
const moment = require("moment");
const {validate} = require("../../util");
const router = express.Router();

/**
 * @api {get} /v1/volumeRange Get Volume between timestamps
 * @apiName getVolumeRange
 * @apiGroup Core
 *
 * @apiSuccess {Number} volume_usd  Volume in USD
 *
 */

const schema = yup.object({
  query: yup.object({
    start: yup.date().required().transform(value => {
      return value ? moment(value).toDate() : value;
    }),
    end: yup.date().required().transform(value => {
      return value ? moment(value).toDate() : value;
    })
  })
});

router.get('/', validate(schema), async (req, res, next) => {
  try {
    let start_date = req.query.start; // mandatory
    let end_date = req.query.end; // mandatory

    console.log(new Date(start_date * 1000), new Date(end_date * 1000));

    let volume = await getVolumeByRange(start_date, end_date);
    res.json(volume);
  } catch (error) {
    next(error);
  }
});

module.exports = router;