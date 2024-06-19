import { isAuthenticated } from '@helpers';
import { User } from '@models/User';

export const userQuery = {
  me: async (parent, args, { user }, info) => {
    isAuthenticated(user);
    return user;
  },
  users: async (parent, args, { user }, info) => {
    isAuthenticated(user);
    const result = await User.find();
    return result;
  },
};
