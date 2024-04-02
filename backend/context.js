import jwt from 'jsonwebtoken';
import HttpError from './helpers/HttpError.js';
import { User } from './models/User.js';

const { JWT_SECRET } = process.env;

export const context = async ({ req, res }) => {
  const { authorization = '' } = req.headers;
  const [token] = authorization.split(' ');

  const { id } = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(id);

  return { user };
};
