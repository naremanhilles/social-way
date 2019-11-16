const { updatePersonalDataQuery } = require('../../../database/queries/updataTip');

module.exports = async (req, res, next) => {
  const { tips, id } = req.body;
  try {
    const tipsQueries = tips.map((tip, index) => updatePersonalDataQuery(tip, id[index]));
    const tipsUpdataedawait = await Promise.all(tipsQueries);
    res.send({
      data: {
        tipsUpdataedawait,
      },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
