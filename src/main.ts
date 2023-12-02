import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as cors from 'cors';
import { RoleGuard } from './role/role.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // 全局注册权限校验守卫，在controller的路由上使用装饰器@SetMetaData，然后在RoleGuard里面取值做判断
  // app.useGlobalGuards(new RoleGuard(new Reflector()));

  // swagger使用
  const options = new DocumentBuilder()
    // 添加文档查看jwt校验
    .addBearerAuth()
    // 设置文档标题
    .setTitle('小胡的Nestjs-Stduy')
    // 设置接口文档的描述
    .setDescription('我是接口文档的描述')
    // 设置接口版本
    .setVersion('1')
    // 打包
    .build();

  // 创建文档
  const document = SwaggerModule.createDocument(app, options);

  // 安装，访问路径：http://localhost:3000/api-docs
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
