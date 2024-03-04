import Joi from 'joi';
import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Category = model('category', categorySchema);

const categoryAddSchema = Joi.object({
  name: Joi.string().required(),
});

export { Category, categoryAddSchema };
