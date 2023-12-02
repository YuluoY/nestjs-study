import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

// 自定义一个Role装饰器
export const Role = (...args: string[]) => SetMetadata('role', args);

// 获取请求url的装饰器
export const ReqUrl = createParamDecorator((decorParam?: string, ctx?: ExecutionContext) => {
  console.log('装饰器传入的值：', decorParam);
  const url = ctx.switchToHttp().getRequest<Request>().url;
  console.log('请求的url：', url);
  return {
    url,
    decorParam,
  };
});
