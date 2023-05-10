import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @ApiProperty({ description: '回答Id', example: 1 })
  @IsNotEmpty({ message: '回答id不能为空' })
  answerId: number;
}
