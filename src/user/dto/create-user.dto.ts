import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
