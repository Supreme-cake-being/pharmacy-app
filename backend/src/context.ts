import jwt from 'jsonwebtoken';
import { HttpError } from '@helpers/index';
import { User } from '@models/User';

const { JWT_SECRET } = process.env;

export const context = async ({ req }) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return {};
  }

  const [_, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    return { user };
  } catch (error) {
    HttpError(401, 'Not authorized');
  }
};
