import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty({ message: '问题Id不能为空' })
  @ApiProperty({ description: '问题Id', example: 3 })
  questionId: number;

  @IsNotEmpty({ message: '内容不能为空' })
  @ApiProperty({ description: '评论内容', example: 'hahhh' })
  content: string;

  @ApiProperty({ description: 'markdown格式的评论内容', example: 'markdown' })
  markdownContent: string;
}
