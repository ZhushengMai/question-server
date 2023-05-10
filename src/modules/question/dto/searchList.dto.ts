import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PageDTO } from 'src/common/dto/page.dto';

export class SearchListDTO extends PartialType(PageDTO) {
  @ApiProperty({ description: '关键字' })
  @IsNotEmpty({ message: '关键词不能为空' })
  keywords: string;
}
