import { isValidId, isAuthenticated, HttpError } from '@helpers';
import { Appointment } from '@models/Appointment';
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
