import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { emailRegex, phoneRegex } from '@constants/regex';
import { handleSaveError, runValidatorsAtUpdate } from './hooks';

const doctorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Email is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    Users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    Appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'appointment',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

doctorSchema.post('save', handleSaveError);

doctorSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

doctorSchema.post('findOneAndUpdate', handleSaveError);

const Doctor = model('doctor', doctorSchema);

const doctorCreateSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const doctorUpdateSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().pattern(emailRegex),
  phone: Joi.string().pattern(phoneRegex),
  rating: Joi.number().min(0).max(5),
});

export { Doctor, doctorCreateSchema, doctorUpdateSchema };
