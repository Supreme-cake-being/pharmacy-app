import { Schema, model } from 'mongoose';

const doctorSchema = new Schema(
  {
    User: {
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

const Doctor = model('doctor', doctorSchema);

export { Doctor };
