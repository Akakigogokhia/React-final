const { default: mongoose } = require('mongoose');
const CONN = mongoose.connection;
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const User = require('@models/User');
const messages = require('@constants/messages');
const messageUtils = require('@utils/messageUtils');
const { generateToken } = require('@utils/securityUtils');

exports.registration = async (req, res) => {
  const session = await CONN.startSession();
  try {
    session.startTransaction();

    const encryptedPassword = bcrypt.hashSync(
      req.body.password,
      Number(process.env.PASSWORD_SALT_ROUNDS)
    );

    await User.create(
      [
        {
          ...req.body,
          password: encryptedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return res.send(messages.SUCCESSFULL_REGISTRATION);
  } catch (error) {
    await session.abortTransaction();
    if (error.code === 11000) {
      return res
        .status(400)
        .send(messageUtils.getDuplicateFieldMsg('User', error.keyPattern));
    }
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  } finally {
    session.endSession();
  }
};

exports.login = async (req, res) => {
  let foundUser;
  let passwordsMatch;

  if (!req.body.email || !req.body.password) {
    return res.status(400).send(messages.ALL_FIELDS_REQUIRED);
  }
  try {
    foundUser = await User.findOne({ email: req.body.email });
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }

  if (!foundUser) return res.status(401).send(messages.INVALID_CREDENTIALS);

  try {
    passwordsMatch = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }

  if (passwordsMatch) {
    const token = generateToken(
      {
        id: foundUser.id,
        username: foundUser.username || null,
        email: foundUser.email,
        type: 'auth',
      },
      '24h'
    );

    foundUser.lastLogin = Date.now();
    await foundUser.save();
    return res.send({ token });
  }

  return res.status(401).send(messages.INVALID_CREDENTIALS);
};

exports.activate = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.activationData.email });

    if (!foundUser)
      return res.status(404).send(messageUtils.getNotFoundMessage('User'));

    foundUser.active = true;
    await foundUser.save();

    delete req.activationData;

    return res.send(messages.SUCCESSFULL_ACTIVATION);
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
};
