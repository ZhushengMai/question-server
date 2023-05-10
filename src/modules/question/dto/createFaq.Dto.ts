import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFaqDTO {
  @ApiProperty({
    description: '问题标题',
    example: '一个小问题',
  })
  @IsNotEmpty({ message: '请输入问题标题' })
  readonly title: string;

  @ApiProperty({
    description: '问题内容',
    example: '<h1>一个小问题<h1>',
  })
  @IsNotEmpty({ message: '请输入问题内容' })
  readonly content: string;

  @ApiProperty({
    description: '问题内容',
    example: '# 一个小问题',
  })
  @IsNotEmpty({ message: '请输入问题内容' })
  readonly markdownContent: string;

  @ApiProperty({ description: '板块信息', example: 1 })
  readonly boardId: number;
}
