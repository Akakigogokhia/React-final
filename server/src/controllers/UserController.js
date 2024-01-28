const bcrypt = require('bcrypt');
const User = require('@models/User');
const messages = require('@constants/messages');
const messageUtils = require('@utils/messageUtils');

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate({ _id: req.user.id }, req.body);
    if (updated)
      return res.send(messageUtils.getSuccessmsg('Updating profile'));
    return res.send(messageUtils.getNotFoundmsg('Profile'));
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const foundProfile = await User.findById(req.user.id);
    const passwordsMatch = await bcrypt.compare(
      oldPassword,
      foundProfile.password
    );

    if (passwordsMatch) {
      if (oldPassword === newPassword)
        return res
          .status(400)
          .send({ msg: "Old password can't be your new password" });

      foundProfile['password'] = bcrypt.hashSync(
        newPassword,
        Number(process.env.PASSWORD_SALT)
      );

      await foundProfile.save();
      return res.send(messageUtils.getSuccessmsg('Changing password'));
    }

    return res.status(400).send({ msg: 'Old password is incorrect' });
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
};
