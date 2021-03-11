const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const { HttpCode } = require('../helpers/constants');
const createFolderIsExist = require('../helpers/create-dir');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'Error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'User with this email is already exist',
      });
    }

    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'Success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'Error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Invalid credentials',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: 'Success',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, _next) => {
  const userId = req.user.id;
  await Users.updateToken(userId, null);
  return res.status(HttpCode.NO_CONTENT).json();
};

const avatars = async (req, res, _next) => {
  try {
    const id = req.user.id;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    const pathFile = req.file.path;
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
    const img = await Jimp.read(pathFile);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
    await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
    await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
    const avatarUrl = path.normalize(path.join(id, newNameAvatar));
    try {
      await fs.unlink(
        path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar),
      );
    } catch (error) {
      console.log(error.message);
    }
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: 'Success',
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { reg, login, logout, avatars };
