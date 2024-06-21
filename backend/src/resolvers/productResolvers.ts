import { HttpError, isAuthenticated, isValidId } from '@helpers';
import { Pharmacy } from '@models/Pharmacy';
import {
  Product,
  productCreateSchema,
  productUpdateSchema,
} from '@models/Product';

export const productQuery = {
  products: async (parent, { pharmacyId }, { user }, info) => {
    const result = await Product.find();
    return result;
  },
  productById: async (parent, { productId }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'productId', value: productId });

    const result = await Product.findById({ id: productId });
    return result;
  },
};

export const productMutation = {
  productCreate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);

    const { name, price, type, category, pharmacyId } = record;

    isValidId({ name: 'pharmacyId', value: pharmacyId });

    const { error } = productCreateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const pharmacy = await Pharmacy.findOne({ _id: pharmacyId });
    if (!pharmacy) {
      throw HttpError(404, 'Pharmacy not found');
    }

    const result = await Product.create({
      name,
      price,
      type,
      category,
      Pharmacy: pharmacy,
    });

    await Pharmacy.findOneAndUpdate(
      { _id: pharmacyId },
      { $push: { Products: { ...result } } }
    );

    return result;
  },
  productUpdate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);

    const { id, name, price, type, category } = record;

    isValidId({ name: 'id', value: id });

    const { error } = productUpdateSchema.validate({
      name,
      price,
      type,
      category,
    });
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, type, category }
    );

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    return result;
  },
  productDelete: async (parent, { id }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'id', value: id });

    const result = await Product.findOneAndDelete({ _id: id });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return true;
  },
};
