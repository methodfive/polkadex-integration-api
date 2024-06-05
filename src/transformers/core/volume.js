const {isEmpty} = require("../../util");
const moment = require("moment");

const transformVolume = (item) => {
    if(isEmpty(item))
        return;

    return {
        stat_date: item.stat_date !== null ? moment.utc(item.stat_date).format("YYYY-MM-DD") : null,
        volume_usd: item.volume,
    };
};

module.exports = transformVolume;