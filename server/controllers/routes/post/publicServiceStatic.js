const { getPrimaryTags } = require('../../../database/queries/getPrimaryTags');
const { getSecondaryTags } = require('../../../database/queries/getSecondaryTags');
const { getPublicServiceTip } = require('../../../database/queries/getPublicServiceTip');

module.exports = async (req, res, next) => {
  try {
    const primaryTags = await getPrimaryTags();
    const secondaryTags = await getSecondaryTags();
    const tips = await getPublicServiceTip();
    res.send({
      data: {
        primaryTags: primaryTags.rows,
        secondaryTags: secondaryTags.rows,
        tips: tips.rows,
      },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
