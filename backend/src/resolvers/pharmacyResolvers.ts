import { isAuthenticated, isValidId } from '@helpers';
import { Pharmacy } from '@models/Pharmacy';

export const pharmacyQuery = {
  pharmacies: async () => {
    const result = await Pharmacy.find();
    return result;
  },
  pharmacyById: async (parent, { pharmacyId }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'pharmacyId', value: pharmacyId });

    const result = await Pharmacy.findById({ id: pharmacyId });
    return result;
  },
};
