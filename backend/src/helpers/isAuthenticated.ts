import { HttpError } from './HttpError';

export const isAuthenticated = (user: any) => {
  if (!user || !user.token) {
    throw HttpError(401, 'Not authorized');
  }
};
