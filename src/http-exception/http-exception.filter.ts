import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * A filter to catch and handle all exceptions thrown by the application.
 * It formats the response to provide a consistent structure for error messages.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * This method is invoked when an exception is caught.
   * @param exception - The exception that was thrown.
   * @param host - The context that contains details about the request and response.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error',
    });
  }
}
