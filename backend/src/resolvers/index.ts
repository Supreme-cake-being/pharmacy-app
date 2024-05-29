import { authMutation } from './authResolvers';
import { userQuery } from './userResolvers';
import { doctorMutation, doctorQuery } from './doctorResolvers';
import { appointmentQuery } from './appointmentResolvers';
import { pharmacyQuery } from './pharmacyResolvers';
import { productQuery } from './productResolvers';
import { categoryQuery } from './categoryResolvers';

const resolvers = {
  Query: {
    ...userQuery,
    ...doctorQuery,
    ...appointmentQuery,
    ...pharmacyQuery,
    ...productQuery,
    ...categoryQuery,
  },

  Mutation: { ...authMutation, ...doctorMutation },
};

export default resolvers;
