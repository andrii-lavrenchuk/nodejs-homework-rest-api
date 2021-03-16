const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const quard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: 'Error',
        code: HttpCode.FORBIDDEN,
        data: 'Forbidden',
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = quard;
