import { PageDTO } from '@/common/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentListDTO extends PageDTO {
  @ApiProperty({ description: '回答Id' })
  answerId: number;
}
