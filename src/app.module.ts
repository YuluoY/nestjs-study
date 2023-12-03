import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config.ormconfig as any), LoginModule, GuardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
