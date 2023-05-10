import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';

export class IdDTO {
  @ApiProperty({
    description: '问题id',
    example: 1,
  })
  @IsNotEmpty({ message: 'id不能为空' })
  readonly questionId: number;
}
