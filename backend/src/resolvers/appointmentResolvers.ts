import { isValidId, isAuthenticated, HttpError } from '@helpers';
import {
  Appointment,
  appointmentCreateSchema,
  appointmentUpdateSchema,
} from '@models/Appointment';
import { Doctor } from '@models/Doctor';
import { User } from '@models/User';

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

    const result = await Appointment.findById(appointmentId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return result;
  },
};

export const appointmentMutation = {
  appointmentCreate: async (parent, { record }, { user }, info) => {
    const { time, doctorId } = record;
    isAuthenticated(user);
    isValidId({ name: 'doctorId', value: doctorId });

    const { error } = appointmentCreateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const doctor = await Doctor.findById(doctorId);
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

    const currentDate = new Date().getTime();
    const sentDate = new Date(time).getTime();

    if (sentDate <= currentDate) {
      throw HttpError(401, 'Time cannot be in the past');
    }

    const { _id } = await Appointment.create({
      time,
      User: user,
      Doctor: doctor,
    });
    const result = await Appointment.findById(_id);

    await Doctor.findOneAndUpdate(
      { _id: doctorId },
      { $push: { Appointments: { ...result } } }
    );

    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { Appointments: { ...result } } }
    );

    if (user.Doctors.find(({ _id }) => _id === doctorId)) {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { Doctors: { ...doctor } } }
      );
    }

    return result;
  },
  appointmentUpdate: async (parent, { record }, { user }, info) => {
    const { id, time } = record;
    isAuthenticated(user);
    isValidId({ name: 'id', value: id });

    const { error } = appointmentUpdateSchema.validate(record);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Appointment.findOneAndUpdate(
      { _id: id, User: user },
      { time }
    );

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    return result;
  },
  appointmentDelete: async (parent, { id }, { user }, info) => {
    isAuthenticated(user);
    isValidId({ name: 'id', value: id });

    const result = await Appointment.findOneAndDelete({ _id: id });
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    return true;
  },
};
