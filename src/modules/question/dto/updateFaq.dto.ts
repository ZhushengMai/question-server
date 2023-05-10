import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFaqDTO } from './createFaq.Dto';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateFaqDTO extends PartialType(CreateFaqDTO) {
  @ApiProperty({
    description: '问题ID',
    example: 1,
  })
  @IsNotEmpty({ message: 'id不能为空' })
  readonly questionId: number;
  @ApiProperty({
    description: '是否被解决',
    default: false,
  })
  isSolve?: boolean;
}
