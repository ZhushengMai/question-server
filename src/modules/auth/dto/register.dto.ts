import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: '用户名，唯一',
    example: 'maizhusheng',
  })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @ApiProperty({
    description: '邮箱，用于找回密码,唯一',
    example: '1806730767@qq.com',
  })
  @IsNotEmpty({ message: '请输入邮箱' })
  readonly email: string;

  @ApiProperty({
    description: '用户昵称',
    example: '约翰史密斯',
  })
  @IsNotEmpty({ message: '请输入昵称' })
  @IsString({ message: '名字必须是String类型' })
  readonly nickName: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;

  @ApiProperty({
    description: '二次输入密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string;
}
