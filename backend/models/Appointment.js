import { Schema, model } from 'mongoose';
import Joi from 'joi';

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
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Appointment = model('appointment', appointmentSchema);

const appointmentAddSchema = Joi.object({
  time: Joi.date().required(),
  Doctor: Joi.string().required(),
});

const appointmentUpdateSchema = Joi.object({
  time: Joi.date().required(),
});

export { Appointment, appointmentAddSchema, appointmentUpdateSchema };
