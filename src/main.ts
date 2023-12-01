import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as cors from 'cors';

async function bootstrap() {
  // 添加NestExpressApplication泛型，扩展属性的类型推导。
  // 不然eslint会报错useStaticAssets不存在。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置允许跨域
  app.enableCors();

  // 使用第三方库cors实现跨域
  // app.use(cors());

  // 使用静态目录。src/public下的所有文件都可以直接访问
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 全局注册异常拦截器
  app.useGlobalFilters(new HttpFilter());

  // 全局注册响应拦截器
  app.useGlobalInterceptors(new Response());

  // 全局注册类型校验管道  搭配class-validator库使用
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
