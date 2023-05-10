import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AnswerListDTO } from './dto/answerList.dto';
import { DelAnswerDTO } from './dto/del-answer.dto';
import { AdoptAnswerDTO } from './dto/adopt.Dto';
@ApiTags('问题回答')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // 添加回答
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('createAnswer')
  createAnswer(@Body() createAnswerDto: CreateAnswerDto, @Req() req: Request) {
    const user = req.user;
    return this.answerService.createAnswer(createAnswerDto, user);
  }
  // 根据问题ID查询所属回答
  @Post('getAnswerList')
  findAllByQuestionID(@Body() answerListDto: AnswerListDTO) {
    return this.answerService.findAllByQuestionID(answerListDto);
  }
  // 修改回答
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('updateAnswer')
  updateAnswer(@Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.updateAnswer(updateAnswerDto);
  }
  // 删除回答
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('deleteAnswer')
  deleteAnswer(@Body() delAnswerDto: DelAnswerDTO, @Req() req: Request) {
    const userInfo = req.user;
    return this.answerService.deleteAnswer(delAnswerDto, userInfo);
  }

  // 采纳回答
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('adoptAnswer')
  adoptAnswer(@Body() adoptAnswerDto: AdoptAnswerDTO, @Req() req: Request) {
    const userInfo = req.user;
    return this.answerService.adoptAnswer(adoptAnswerDto, userInfo);
  }
}
