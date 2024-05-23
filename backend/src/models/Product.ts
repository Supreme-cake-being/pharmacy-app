import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { medicineTypes } from '@constants/medicineTypes';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    type: {
      type: String,
      enum: medicineTypes,
      required: [true, 'Type is required'],
    },
    Categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
      },
    ],
    Pharmacies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pharmacy',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Product = model('product', productSchema);

const productAddSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  type: Joi.valid(...medicineTypes).required(),
  Categories: Joi.array().items(Joi.string()),
});

const productUpdateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  type: Joi.valid(...medicineTypes).required(),
  Categories: Joi.array().items(Joi.string()),
});

export { Product, productAddSchema, productUpdateSchema };
