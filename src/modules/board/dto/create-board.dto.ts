import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ description: '板块名称', example: '前端' })
  @IsNotEmpty({ message: '请输入板块名称' })
  boardName: string;
}
