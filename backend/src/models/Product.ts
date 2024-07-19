import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { medicineTypes } from '@constants/medicineTypes';
import { categories } from '@constants/categories';
import { handleSaveError, runValidatorsAtUpdate } from './hooks';

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
    category: {
      type: String,
      enum: categories,
      required: [true, 'Category is required'],
    },
    Pharmacy: {
      type: Schema.Types.ObjectId,
      ref: 'pharmacy',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

productSchema.post('save', handleSaveError);

productSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

productSchema.post('findOneAndUpdate', handleSaveError);

productSchema.pre('find', function () {
  this.populate('Pharmacy');
});

productSchema.pre('findOne', function () {
  this.populate('Pharmacy');
});

productSchema.pre('findOneAndUpdate', function () {
  this.populate('Pharmacy');
});

const Product = model('product', productSchema);

const productCreateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  type: Joi.valid(...medicineTypes).required(),
  category: Joi.valid(...categories).required(),
  pharmacyId: Joi.string().required(),
});

const productUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0),
  type: Joi.valid(...medicineTypes),
  category: Joi.valid(...categories),
});

export { Product, productCreateSchema, productUpdateSchema };
