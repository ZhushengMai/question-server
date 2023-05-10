import { PageDTO } from '@/common/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerListDTO extends PageDTO {
  @ApiProperty({ description: '问题ID' })
  questionId: number;
}
