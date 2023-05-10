import { ApiProperty } from '@nestjs/swagger';
import { PageDTO } from 'src/common/dto/page.dto';

export class FaqListDTO extends PageDTO {
  @ApiProperty({ description: '板块ID', example: 1 })
  boardId?: number;

  @ApiProperty({
    description: '筛选(0:最新,1:未解决,2:已解决)',
    example: 0,
  })
  faqState?: number;

  @ApiProperty({
    description: '用户Id',
    example: 2,
  })
  userId: number;
}
