import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DelAnswerDTO {
  @ApiProperty({ description: '回答ID' })
  @IsNotEmpty({ message: '回答ID不能为空' })
  answerId: number;

  @ApiProperty({ description: '问题ID' })
  @IsNotEmpty({ message: '问题Id不能为空' })
  questionId: number;
}
