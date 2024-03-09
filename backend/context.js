import HttpError from './helpers/HttpError.js';

const { JWT_SECRET } = process.env;

export const context = async ({ req, res }) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Unauthorized');
  }

  // try {
  //   const { id } = jwt.verify(token, JWT_SECRET);
  //   const user = await User.findById(id);
  //   if (!user || !user.token) {
  //     throw HttpError(401, 'Unauthorized');
  //   }
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   throw HttpError(401, 'Unauthorized');
  // }

  return { bearer, token };
};
