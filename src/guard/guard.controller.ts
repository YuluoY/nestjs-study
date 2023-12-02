import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from 'src/role/role.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('guard')
@UseGuards(RoleGuard)
@ApiBearerAuth() // 权限，token校验 文档内的接口请求
@ApiTags('guard守卫的tag') // 这是/guard下路由的标题
export class GuardController {
  constructor(private readonly guardService: GuardService) { }

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get('test')
  // 更多装饰器：https://docs.nestjs.com/openapi/introduction
  @ApiQuery({
    name: 'role',
    required: true,
    description: '这是一个测试角色权限校验的一个路由值，query参数描述',
  })
  @ApiParam({
    name: 'test',
    description: 'api的param参数描述',
  })
  // 返回的信息文档
  @ApiResponse({
    status: 400,
    description: '小黑子露出鸡脚了吧',
  })
  @ApiOperation({
    summary: 'findAll接口',
    description: '描述啦啦啦',
  })
  @SetMetadata('role', ['superAdmin', 'admin'])
  findAll() {
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
