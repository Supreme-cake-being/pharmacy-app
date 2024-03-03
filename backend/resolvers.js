import { User } from './models/User.js';

const resolvers = {
  Query: {
    users: async (parent, args, contextValue, info) => {
      const result = await User.find();
      return result;
    },
  },
};

export default resolvers;
