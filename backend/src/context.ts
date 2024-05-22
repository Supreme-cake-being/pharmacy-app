import jwt from 'jsonwebtoken';
import HttpError from './helpers/HttpError.js';
import { User } from './models/User.js';

const { JWT_SECRET } = process.env;

const getUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const context = async ({ req }) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Not authorizaed');
  }

  try {
    const id = jwt.verify(token, JWT_SECRET);
    return await getUser(id);
  } catch {
    throw HttpError(401, 'Invalid token');
  }

  //   return { user };
};
