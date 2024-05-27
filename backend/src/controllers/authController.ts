import { User } from '@models/User';
import { HttpError, sendEmail } from '@helpers';

const { BASE_URL } = process.env;

const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not Found');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({ message: 'Verification successful' });
};

const resendVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing required email field' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.verified) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification email sent',
  });
};

export const authController = {
  verify: ctrlWrapper(verify),
  resendVerification: ctrlWrapper(resendVerification),
  // possibly will add OAuth
};
