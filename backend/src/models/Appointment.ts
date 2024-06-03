import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks';

const appointmentSchema = new Schema(
  {
    time: {
      type: Date,
      required: [true, 'Time is required'],
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    Doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctor',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

appointmentSchema.post('save', handleSaveError);

appointmentSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

appointmentSchema.post('findOneAndUpdate', handleSaveError);

const Appointment = model('appointment', appointmentSchema);

const appointmentCreateSchema = Joi.object({
  time: Joi.date().required(),
  doctorId: Joi.string().required(),
});

const appointmentUpdateSchema = Joi.object({
  time: Joi.date().required(),
});

export { Appointment, appointmentCreateSchema, appointmentUpdateSchema };
