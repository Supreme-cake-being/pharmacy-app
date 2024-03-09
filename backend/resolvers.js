import { User } from './models/User.js';

const resolvers = {
  Query: {
    me: async (parent, args, { user }, info) => {
      return { _id: '1', fullName: '1', email: '1' };
    },
    users: async (parent, args, { user }, info) => {
      const result = await User.find();
      console.log({ bearer, token });
      return result;
    },
  },
};

export default resolvers;
