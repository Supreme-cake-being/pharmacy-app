import { rule, and, or, not } from 'graphql-shield';
import HttpError from '../helpers/HttpError';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    return user;
  }
);

export const isDoctor = rule({ cache: 'contextual' })(
  async (_, _, { user }, info) => user.role === 'ROLE_DOCTOR'
);

export const isUser = rule({ cache: 'contextual' })(
  async (_, _, { user }, info) => user.role === 'ROLE_USER'
);

const permissions = shield({
  Query: {
    // '*': isAuthenticated,
    me: isAuthenticated,
    users: isDoctor,
  },
  Mutation: {
    '*': isAuthenticated,
  },
});

export default permissions;
