import { HttpErrorResponse } from '@angular/common/http';

type TypeKeyNumber<T> = {
  [key: number]: T;
};

export default function getCodeError(error: HttpErrorResponse) {
  const CATCH_ERROR: TypeKeyNumber<string> = {
    0: 'Problems with connecting to the server, you should contact technical support.',
    400: `Error in the request parameters.`,
    401: 'You are not authorized to perform this action.',
    403: `You are using a temporary key, you must update your key.`,
    404: 'The content you request is not available.',
    409: 'The record is already created.',
    419: 'Temporary password has expired.',
    422: 'The server cannot process your request.',
    500: 'The request to the server could not be completed.',
    503: 'Service not available.',
  };
  return (
    CATCH_ERROR[error.status] ||
    'Problem with the request, contact technical support'
  );
}
