import { isValidObjectId } from 'mongoose';
import { HttpError } from './HttpError';

interface IProps {
  name: string;
  value: string;
}

export const isValidId = ({ name, value }: IProps) => {
  if (!isValidObjectId(value)) {
    throw HttpError(404, `Invalid ${name}`);
  }
};
