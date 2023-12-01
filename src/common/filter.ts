import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// 异常拦截器
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { getResponse, getRequest } = host.switchToHttp();
    const response = getResponse<Response>();
    const request = getRequest<Request>();

    const status = exception.getStatus();

    // 优先取全局的异常管道符校验失败的响应信息，前提是使用了全局的校验管道
    const message = exception.getResponse() || exception.message;

    response.status(status).json({
      status,
      data: message,
      success: false,
      time: new Date(),
      path: request.url,
    });
  }
}
