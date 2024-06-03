import { isValidId, isAuthenticated, HttpError } from '@helpers';
import {
  Appointment,
  appointmentCreateSchema,
  appointmentUpdateSchema,
} from '@models/Appointment';
import { Doctor } from '@models/Doctor';

export const appointmentQuery = {
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

    const result = await Appointment.findById({ _id: appointmentId });
    return result;
  },
};

export const appointmentResolvers = {
  appointmentCreate: async (parent, { record }, { user }, info) => {
    const { time, doctorId } = record;
    isAuthenticated(user);
    isValidId({ name: 'doctorId', value: doctorId });

    const { error } = appointmentCreateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const doctor = await Doctor.findById({ id: doctorId });
    if (!doctor) {
      throw HttpError(404, 'Doctor not found');
    }

    const appoinmentsByDoctor = await Appointment.find({
      time,
      Doctor: doctor,
    });
    if (appoinmentsByDoctor.length !== 0) {
      throw HttpError(401, 'Doctor already has an appointment on this time');
    }

    const appoinmentsByUser = await Appointment.find({
      time,
      User: user,
    });
    if (appoinmentsByUser.length !== 0) {
      throw HttpError(401, 'User already has an appointment on this time');
    }

    const result = await Appointment.create({
      time,
      User: user,
      Doctor: doctor,
    });
    return result;
  },
  appointmentUpdate: async (parent, { record }, { user }, info) => {
    const { time } = record;
    isAuthenticated(user);

    const { error } = appointmentUpdateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Appointment.findOneAndUpdate({ User: user }, { time });
    return result;
  },
  appointmentDelete: async (parent, { record }, { user }, info) => {
    isAuthenticated(user);

    const result = await Appointment.findOneAndDelete({ _id: user.id });
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    return true;
  },
};
