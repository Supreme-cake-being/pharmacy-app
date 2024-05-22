import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '@models/User';

import HttpError from './helpers/HttpError';

const { JWT_SECRET } = process.env;

const resolvers = {
  Query: {
    me: async (parent, args, ctx, info) => {
      return { _id: '1', fullName: '1', email: '1' };
    },
    users: async (parent, args, ctx, info) => {
      const result = await User.find();
      return result;
    },
  },

  Mutation: {
    signup: async (parent, { record }, ctx, info) => {
      const { email, password, phone } = record;

      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw HttpError(409, 'Email is already in use');
      }

      const userByPhone = await User.findOne({ phone });
      if (userByPhone) {
        throw HttpError(409, 'Phone number is already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = nanoid();

      const newUser = await User.create({
        ...record,
        password: hashedPassword,
        verificationCode,
      });

      return newUser;
    },
    login: async (parent, { record }, ctx, info) => {
      const { email, password } = record;

      const user = await User.findOne({ email });
      if (!user) {
        throw HttpError(401, 'Email or password is wrong');
      }

      if (!user.verified) {
        throw HttpError(403, 'Verify your email');
      }

      const comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword) {
        throw HttpError(401, 'Email or password is wrong');
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      await User.findByIdAndUpdate(user._id, { token });

      return { token };
    },
    logout: async (parent, args, ctx, info) => {
      console.log(ctx.user);

      return 'Logout complete';
    },
  },
};

export default resolvers;
