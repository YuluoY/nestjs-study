import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(Login) private readonly loginManager: Repository<Login>) {}
  async create(createLoginDto: CreateLoginDto) {
    try {
      await this.loginManager.manager.transaction(async (manager: EntityManager) => {
        const res = await manager.save(Login, createLoginDto);
        throw new HttpException('事务失败测试', HttpStatus.INTERNAL_SERVER_ERROR);
        await manager.update(
          Login,
          { id: '5f5fe97a-a280-423e-bc03-ab577eea6fd9' },
          {
            email: '567051234@qq.com',
          }
        );
      });
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
