import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdoptAnswerDTO {
  @ApiProperty({ description: '问题ID' })
  @IsNotEmpty({ message: '问题Id不能为空' })
  questionId: number;

  @ApiProperty({ description: '回答ID' })
  @IsNotEmpty({ message: '回答Id不能为空' })
  answerId: number;
}
