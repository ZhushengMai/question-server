import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({ description: '问题Id', example: 3 })
  questionId: number;
  @ApiProperty({ description: '评论内容', example: 'hahhh' })
  content: string;
  @ApiProperty({ description: 'markdown格式的评论内容', example: 'markdown' })
  markdownContent: string;
}
