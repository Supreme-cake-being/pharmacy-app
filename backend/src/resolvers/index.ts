import { authMutation } from './authResolvers';
import { userQuery } from './userResolvers';
import { doctorMutation, doctorQuery } from './doctorResolvers';
import { appointmentMutation, appointmentQuery } from './appointmentResolvers';
import { pharmacyQuery } from './pharmacyResolvers';
import { productMutation, productQuery } from './productResolvers';

const resolvers = {
  Query: {
    ...userQuery,
    ...doctorQuery,
    ...appointmentQuery,
    ...pharmacyQuery,
    ...productQuery,
  },

  Mutation: {
    ...authMutation,
    ...doctorMutation,
    ...appointmentMutation,
    ...productMutation,
  },
};

export default resolvers;
