import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { RoleGuard } from 'src/role/role.guard';
import { ReqUrl, Role } from 'src/common/decorators';
// import { LoginPipe } from './login.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // @Post('create')
  // create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
  //   console.log(createLoginDto);
  //   return this.loginService.create(createLoginDto);
  // }
  @Post('create')
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @Role('superAdmin', 'admin')
  findAll(@ReqUrl('JK') url: string) {
    console.log(url);
    return this.loginService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @SetMetadata('role', ['admin'])
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
