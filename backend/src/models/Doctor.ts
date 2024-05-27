import { Schema, model } from 'mongoose';

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
    },
    rating: {
      type: Number,
      default: 0,
    },
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

const Doctor = model('doctor', doctorSchema);

export { Doctor };
