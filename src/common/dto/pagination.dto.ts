import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';

export class PaginationDTO {
  /**
   * 第几页
   */
  @ApiProperty({ description: '第几页', example: 1 })
  @IsOptional()
  readonly page?: number;

  /**
   * 每页数据条数
   */
  @ApiProperty({ description: '每页数据条数', example: 10 })
  @IsOptional()
  readonly pageSize?: number;

  /**
   * 总页数
   */
  pages: number;

  /**
   * 总条数
   */
  total: number;
}
