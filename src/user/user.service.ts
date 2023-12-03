import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userManager: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    await this.userManager.save(createUserDto);
    // throw new HttpException('事务失败测试', HttpStatus.INTERNAL_SERVER_ERROR);
    await this.userManager.update(
      {
        username: 'ikun',
      },
      {
        username: 'GGBond',
      }
    );

    // await this.userManager.manager.transaction(async (manager: EntityManager) => {
    //   await manager.save(User, createUserDto);
    //   throw new HttpException('事务失败测试', HttpStatus.INTERNAL_SERVER_ERROR);
    //   const res = await manager.update(
    //     User,
    //     {
    //       username: 'ikun',
    //     },
    //     {
    //       username: 'GGBond',
    //     }
    //   );
    //   console.log(res, 'res');
    // });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
