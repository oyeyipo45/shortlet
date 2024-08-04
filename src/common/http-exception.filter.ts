import { CONSTANTS } from '@Common/constants';
import { APIResponse } from '@Common/index';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const message = exception.message
      ? exception.message
      : CONSTANTS.INTERNAL_SERVER_ERROR_MESSAGE;

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: APIResponse = {
      status,
      success: false,
      message,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify({
        body: request.body,
        query: request.query,
        response: errorResponse,
        message: exception.message,
        trace: exception.stack,
      }),
      'ExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
