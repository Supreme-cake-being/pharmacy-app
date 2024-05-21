import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { plans } from '@constants/plans.js';
import { roles } from '@constants/roles.js';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
const phoneRegex = /^\d{0,15}$/;

const userSchema = new Schema(
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
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    role: {
      type: String,
      enum: roles,
      default: 'ROLE_USER',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: '',
    },
    token: String,
    Appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'appointment',
        required: true,
      },
    ],
    Doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'doctor',
        required: true,
      },
    ],
    Plan: {
      type: String,
      enum: plans,
      default: 'PLAN_FREE',
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const User = model('user', userSchema);

const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  age: Joi.number().required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export { User, userSignUpSchema, userLoginSchema };
