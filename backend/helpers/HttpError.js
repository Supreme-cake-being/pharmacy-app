import { GraphQLError } from 'graphql';

const messageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  409: 'Conflict',
};

const HttpError = (code, message = messageList[code]) => {
  const error = new GraphQLError(message, {
    extensions: { code: code },
  });
  console.log(error);
  return error;
};

export default HttpError;
