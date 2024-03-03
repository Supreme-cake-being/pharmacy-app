import { Schema, model } from 'mongoose';

const roles = ['ROLE_USER', 'ROLE_DOCTOR'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'ROLE_USER',
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

export { User };
