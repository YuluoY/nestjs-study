import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  // 更多可以查看SchemaObject类型定义的一些字段
  @ApiProperty({
    required: false,
    default: '小胡',
  })
  name: string;

  @ApiProperty({
    required: false,
    default: 18,
  })
  age: number;

  @ApiProperty({
    default: 'JK',
    type: String,
    required: true,
  })
  hobby: string;
}
