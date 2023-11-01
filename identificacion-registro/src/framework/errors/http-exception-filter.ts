import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";

export class HttpExceptionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
  }

}