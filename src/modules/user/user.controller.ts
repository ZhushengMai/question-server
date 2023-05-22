import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update.dto';
import { Request } from 'express';
@ApiTags('用户信息')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('allUser')
  async findAll() {
    return this.userService.findAll();
  }

  @Post(':userId')
  async findUserById(@Param('userId') userId: number) {
    return this.userService.findUserById(userId);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Post('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDTO, @Req() req: Request) {
    // return this.userService.updateUser(updateUserDto, userInfo);
    return '测试';
  }
}
