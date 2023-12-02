import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [LoginModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
