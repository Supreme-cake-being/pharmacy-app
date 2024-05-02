import { User } from '@models/User';

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
};

export default resolvers;
