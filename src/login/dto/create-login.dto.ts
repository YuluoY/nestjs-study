import { IsEmail, IsUUID, Length } from 'class-validator';

export class CreateLoginDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;
}
