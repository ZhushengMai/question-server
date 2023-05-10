import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: 'Id不能为空' })
  readonly userId: number;
  @ApiProperty({ description: '昵称' })
  readonly nickName?: string;

  @ApiProperty({ description: '个人简介' })
  readonly introduction: string;

  @ApiProperty({ description: '城市' })
  readonly city: string;
}
