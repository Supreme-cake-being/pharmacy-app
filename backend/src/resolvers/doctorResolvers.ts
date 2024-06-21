import { isValidId, isAuthenticated, HttpError } from '@helpers';
import { Doctor, doctorCreateSchema, doctorUpdateSchema } from '@models/Doctor';

export const doctorQuery = {
  doctors: async () => {
    const result = await Doctor.find().populate(['Users', 'Appointments']);
    return result;
  },
  doctorById: async (parent, { doctorId }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'doctorId', value: doctorId });

    const result = await Doctor.findById(doctorId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return result;
  },
};

export const doctorMutation = {
  doctorCreate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);
    const { error } = doctorCreateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const doctorsByEmail = await Doctor.find({
      email: record.email,
    });
    if (doctorsByEmail.length !== 0) {
      throw HttpError(409, 'Email is already in use');
    }

    const doctorsByPhone = await Doctor.find({
      phone: record.phone,
    });
    if (doctorsByPhone.length !== 0) {
      throw HttpError(409, 'Phone is already in use');
    }

    const result = await Doctor.create(record);
    return result;
  },
  doctorUpdate: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);
    const { id, fullName, email, phone, rating } = record;

    isValidId({ name: 'id', value: id });

    const { error } = doctorUpdateSchema.validate({
      fullName,
      email,
      phone,
      rating,
    });
    if (error) {
      throw HttpError(400, error.message);
    }

    const doctorsByEmail = await Doctor.find({
      email,
    });
    if (doctorsByEmail.length !== 0) {
      throw HttpError(409, 'Email is already in use');
    }

    const doctorsByPhone = await Doctor.find({
      phone,
    });
    if (doctorsByPhone.length !== 0) {
      throw HttpError(409, 'Phone is already in use');
    }

    const result = await Doctor.findOneAndUpdate(
      { _id: id },
      {
        fullName,
        email,
        phone,
        rating,
      }
    );

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    return result;
  },
  doctorDelete: async (parent, { id }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'doctorId', value: id });

    const result = await Doctor.findOneAndDelete({ _id: id });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return true;
  },
};
