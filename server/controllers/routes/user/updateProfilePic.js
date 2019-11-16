const { promisify } = require('util');
const { join } = require('path');
const updateUserPic = require('./../../../database/queries/updateUserPic');

module.exports = async (req, res, next) => {
  const { id: userId } = req.user;
  if (!(req.files && req.files.image)) return res.status(400).send({ error: 'You need to provide an image', statusCode: 400 });

  const { image } = req.files;
  const imageName = Date.now() + image.name;
  const moveImg = promisify(image.mv);

  try {
    await moveImg(join(__dirname, '..', '..', '..', 'uploads', imageName));
    await updateUserPic(userId, imageName);
    return res.send({ data: { imgSrc: imageName } });
  } catch (e) {
    return next(e);
  }
};
