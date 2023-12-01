import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
