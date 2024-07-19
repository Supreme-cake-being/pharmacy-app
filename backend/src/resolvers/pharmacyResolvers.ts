import { HttpError, isAuthenticated, isValidId } from '@helpers';
import {
  Pharmacy,
  pharmacyCreateSchema,
  pharmacyUpdateSchema,
} from '@models/Pharmacy';

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
  pharmacyCreate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);
    const { name, geos } = record;

    const { error } = pharmacyCreateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Pharmacy.create({ name, geos });
    return result;
  },
  pharmacyUpdate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);
    const { id, name, geos } = record;
    isValidId({ name: 'id', value: id });

    const { error } = pharmacyUpdateSchema.validate({ name, geos });
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Pharmacy.findOneAndUpdate({ _id: id }, { name, geos });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return result;
  },
  pharmacyDelete: async (parent, { id }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'id', value: id });

    const result = await Pharmacy.findOneAndDelete({ _id: id });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return true;
  },
};
