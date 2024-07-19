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

appointmentSchema.pre('find', function () {
  this.populate(['User', 'Doctor']);
});

appointmentSchema.pre('findOne', function () {
  this.populate(['User', 'Doctor']);
});

appointmentSchema.pre('findOneAndUpdate', function () {
  this.populate(['User', 'Doctor']);
});

const Appointment = model('appointment', appointmentSchema);

const appointmentCreateSchema = Joi.object({
  time: Joi.date().required(),
  doctorId: Joi.string().required(),
});

const appointmentUpdateSchema = Joi.object({
  id: Joi.string().required(),
  time: Joi.date().required(),
});

export { Appointment, appointmentCreateSchema, appointmentUpdateSchema };
