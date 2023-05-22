import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { AnswerListDTO } from './dto/answerList.dto';
import { getPagination } from '@/utils/getPagination.util';
import { DelAnswerDTO } from './dto/del-answer.dto';
import { AdoptAnswerDTO } from './dto/adopt.Dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
  ) {}

  async createAnswer(createAnswerDto: CreateAnswerDto, userInfo) {
    const user = await this.userService.findUserById(userInfo.userId);
    const question = await this.questionService.findQuestionById(
      createAnswerDto.questionId,
    );

    if (!user) return '用户不存在';
    if (!question) return '问题不存在';
    question.answerCount++;
    this.questionService.updateAnswerState(question);
    const answer = new Answer();
    answer.content = createAnswerDto.content;
    answer.markdownContent = createAnswerDto.markdownContent;
    answer.question = question;
    answer.user = user;

    const result = await this.answerRepository.save(answer);
    return {
      result,
    };
  }
  // 根据问题ID查询回答列表
  async findAllByQuestionID(answerListDto: AnswerListDTO) {
    const { page = 1, pageSize = 10, questionId } = answerListDto;
    const getList = await this.answerRepository
      .createQueryBuilder('answer')
      .where('question.questionId = :id', { id: questionId })
      .leftJoin('answer.question', 'question')
      .addSelect(['user.userId', 'user.nickName'])
      .leftJoin('answer.user', 'user')
      // 开始位置
      .skip((page - 1) * pageSize)
      // 查询条数
      .take(pageSize)
      // 获取数据总数
      .getManyAndCount();

    const [list, total] = getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      list,
      pagination,
    };
  }
  // 修改回答
  async updateAnswer(updateAnswerDto: UpdateAnswerDto) {
    const { answerId } = updateAnswerDto;
    const answerToUpdate = await this.answerRepository.findOneBy({ answerId });
    answerToUpdate.content = updateAnswerDto.content;
    answerToUpdate.markdownContent = updateAnswerDto.markdownContent;
    const result = await this.answerRepository.save(answerToUpdate);
    return {
      result,
    };
  }

  async deleteAnswer(delAnswerDto: DelAnswerDTO, userInfo) {
    const { answerId, questionId } = delAnswerDto;
    const question = await this.questionService.findQuestionById(questionId);
    if (!question) return '该问题不存在';
    if (question.answerCount > 0) {
      question.answerCount--;
      this.questionService.updateAnswerState(question);
    }

    const result = await this.answerRepository.delete({ answerId });
    return result;
  }
  // 采纳回答，同时修改问题状态
  async adoptAnswer(adoptAnswerDto: AdoptAnswerDTO, userInfo) {
    const { questionId, answerId } = adoptAnswerDto;
    const question = await this.questionService.findQuestionById(questionId);
    const answer = await this.answerRepository.findOneBy({ answerId });
    question.isSolve = true;
    answer.isAdopt = true;
    await Promise.all([
      this.questionService.updateAnswerState(question),
      this.answerRepository.save(answer),
    ]);

    return '采纳成功';
  }

  async findAnswerById(answerId) {
    return await this.answerRepository.findOneBy({ answerId });
  }
}
