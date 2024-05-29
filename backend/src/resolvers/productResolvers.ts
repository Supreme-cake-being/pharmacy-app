import { isAuthenticated, isValidId } from '@helpers';
import { Product } from '@models/Product';

export const productQuery = {
  products: async (parent, { pharmacyId }, { users }, info) => {
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
