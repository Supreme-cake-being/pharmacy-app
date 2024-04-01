import { rule, and, or, not } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => user !== null
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
    users: isDoctor,
    doctors: isUser,
    doctorById: isUser,
  },
  Mutation: {
    '*': isAuthenticated,
    updateProfile: isUser,
    createUser: isAdmin,
  },
});

export default permissions;
