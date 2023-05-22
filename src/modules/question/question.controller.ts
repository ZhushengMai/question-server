import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateFaqDTO } from './dto/createFaq.Dto';
import { UpdateFaqDTO } from './dto/updateFaq.dto';
import { IdDTO } from './dto/id.dto';
import { SearchListDTO } from './dto/searchList.dto';
import { FaqListDTO } from './dto/faqList.Dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('问题')
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post('faqList')
  async findFaqList(@Body() faqListDto: FaqListDTO) {
    return await this.questionService.findFaqList(faqListDto);
  }

  @Post('faqListByUser')
  async findQuestionByUserId(@Body() faqListDto: FaqListDTO) {
    return await this.questionService.findQuestionByUserId(faqListDto);
  }

  // 发布问题
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('createFaq')
  async createFaq(@Body() createFaqDto: CreateFaqDTO, @Req() req: Request) {
    const user = req.user;

    return await this.questionService.createFaq(createFaqDto, user);
  }
  // 修改问题
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('updateFaq')
  async updateFaq(@Body() updateFaqDto: UpdateFaqDTO) {
    return await this.questionService.updateFaq(updateFaqDto);
  }
  // 删除问题
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('deleteFaq')
  async deleteFaq(@Body() idDto: IdDTO) {
    return await this.questionService.deleteFaq(idDto);
  }

  // 通过关键词查询问题列表
  @Post('search')
  async searchQuestion(@Body() searchListDto: SearchListDTO) {
    return await this.questionService.search(searchListDto);
  }
  // 获取问题详情
  @Post('questionDetail')
  async findFaqDetail(@Body('questionId') questionId: number) {
    return await this.questionService.findFaqDetail(questionId);
  }
}
