import { Category } from '@models/Category';

export const categoryQuery = {
  categories: async () => {
    const result = await Category.find();
    return result;
  },
};
