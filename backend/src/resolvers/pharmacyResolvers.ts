import { HttpError, isAuthenticated, isValidId } from '@helpers';
import { Pharmacy } from '@models/Pharmacy';

export const pharmacyQuery = {
  pharmacies: async () => {
    const result = await Pharmacy.find().populate('Products');
    return result;
  },
  pharmacyById: async (parent, { pharmacyId }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'pharmacyId', value: pharmacyId });

    const result = await Pharmacy.findById(pharmacyId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return result;
  },
};

export const pharmacyMutation = {
  pharmacyCreate: async (parent, { record }, { user }, info) => {},
  pharmacyUpdate: async (parent, { record }, { user }, info) => {},
  pharmacyDelete: async (parent, { id }, { user }, info) => {},
};
