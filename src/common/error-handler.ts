import { HttpStatus } from '@nestjs/common';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { CONSTANTS } from '@Common/constants';

export const getErrorMessage = (
  error: unknown,
): {
  message: string;
  status: HttpStatus;
} => {
  if (error) {
    const data = (<AxiosError>error).response?.data;

    return {
      message: data.message || (<Error>error).message,
      status: data.status || HttpStatus.BAD_REQUEST,
    };
  }

  return {
    message: (<Error>error).message || CONSTANTS.INTERNAL_SERVER_ERROR_MESSAGE,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  };
};
