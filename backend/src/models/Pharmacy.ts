import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorsAtUpdate } from './hooks';

const pharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    geos: {
      type: String,
      required: [true, 'Geos are required'],
    },
    Products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

pharmacySchema.post('save', handleSaveError);

pharmacySchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

pharmacySchema.post('findOneAndUpdate', handleSaveError);

pharmacySchema.pre('findOne', function () {
  this.populate('Products');
});

pharmacySchema.pre('findOneAndUpdate', function () {
  this.populate('Products');
});

const Pharmacy = model('pharmacy', pharmacySchema);

const pharmacyCreateSchema = Joi.object({
  name: Joi.string().required(),
  geos: Joi.string().required(),
});

const pharmacyUpdateSchema = Joi.object({
  name: Joi.string(),
  geos: Joi.string(),
});

export { Pharmacy, pharmacyCreateSchema, pharmacyUpdateSchema };
