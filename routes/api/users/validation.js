const { HttpCode } = require('../../../helpers/constants');

module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'Error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Avatar image is require, please, try again',
    });
  }
  next();
};
