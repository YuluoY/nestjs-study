import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

// pipe系列
// ValidationPipe  // 验证
// ParseIntPipe //  int 整型类型 -- number
// ParseFloatPipe // float 浮点类型
// ParseBoolPipe // boolean 布尔类型
// ParseArrayPipe // array 数组类型
// ParseUUIDPipe // UUID 类型
// ParseEnumPipe // enum 枚举类型
// DefaultValuePipe // any 默认值类型
// ...还有什么文件类型等等，可以进行转换

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getHello(@Param('id', ParseIntPipe) id: number): any {
    console.log('id type ==> ' + typeof id); //  id type ==> number
    return this.appService.getHello();
  }
}
