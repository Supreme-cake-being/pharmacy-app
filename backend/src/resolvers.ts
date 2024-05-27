import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '@models/User';

import { HttpError, isAuthenticated, isValidId } from '@helpers';
import { Doctor } from '@models/Doctor';
import { Appointment } from '@models/Appointment';
import { Pharmacy } from '@models/Pharmacy';
import { Product } from '@models/Product';
import { Category } from '@models/Category';

const { JWT_SECRET } = process.env;

const resolvers = {
  Query: {
    me: async (parent, args, { user }, info) => {
      isAuthenticated(user);
      return { user };
    },
    users: async (parent, args, { user }, info) => {
      isAuthenticated(user);
      const result = await User.find();
      return result;
    },
    doctors: async () => {
      const result = await Doctor.find();
      return result;
    },
    doctorById: async (parent, { doctorId }, { user }, info) => {
      isAuthenticated(user);
      isValidId({ name: 'doctorId', value: doctorId });

      const result = await Doctor.findById({ id: doctorId });
      return result;
    },
    userDoctors: async (parent, args, { user }, info) => {
      isAuthenticated(user);
      const result = await Doctor.find({ User: user });
      return result;
    },
    appointments: async (parent, { doctorId }, { user }, info) => {
      isAuthenticated(user);

      if (doctorId) {
        isValidId({ name: 'doctorId', value: doctorId });

        const doctorById = await Doctor.findById({ id: doctorId });
        if (!doctorById) {
          throw HttpError(404, 'Doctor not found');
        }

        const result = await Appointment.find({ Doctor: doctorById });
        return result;
      }

      const result = await Appointment.find({ User: user });
      return result;
    },
    appointmentById: async (parent, { appointmentId }, { user }, info) => {
      isAuthenticated(user);
      isValidId({ name: 'appointmentId', value: appointmentId });

      const result = await Appointment.findById({ id: appointmentId });
      return result;
    },
    pharmacies: async () => {
      const result = await Pharmacy.find();
      return result;
    },
    pharmacyById: async (parent, { pharmacyId }, { user }, info) => {
      isAuthenticated(user);
      isValidId({ name: 'pharmacyId', value: pharmacyId });

      const result = await Pharmacy.findById({ id: pharmacyId });
      return result;
    },
    products: async (parent, { pharmacyId }, { users }, info) => {
      const result = await Product.find();
      return result;
    },
    productById: async (parent, { productId }, { user }, info) => {
      isAuthenticated(user);
      isValidId({ name: 'productId', value: productId });

      const result = await Product.findById({ id: productId });
      return result;
    },
    categories: async () => {
      const result = await Category.find();
      return result;
    },
  },

  Mutation: {
    signup: async (parent, { record }) => {
      const { email, password, phone } = record;

      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw HttpError(409, 'Email is already in use');
      }

      const userByPhone = await User.findOne({ phone });
      if (userByPhone) {
        throw HttpError(409, 'Phone number is already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = nanoid();

      const newUser = await User.create({
        ...record,
        password: hashedPassword,
        verificationCode,
      });

      return newUser;
    },
    login: async (parent, { record }) => {
      const { email, password } = record;

      const user = await User.findOne({ email });
      if (!user) {
        throw HttpError(401, 'Email or password is wrong');
      }

      if (!user.verified) {
        throw HttpError(403, 'Verify your email');
      }

      const comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword) {
        throw HttpError(401, 'Email or password is wrong');
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      await User.findByIdAndUpdate(user._id, { token });

      return { token };
    },
    logout: async (parent, args, { user }, info) => {
      isAuthenticated(user);

      return 'Logout complete';
    },
  },
};

export default resolvers;
