import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { FaqListDTO } from './dto/faqList.Dto';
import { getPagination } from 'src/utils/getPagination.util';
import { UpdateFaqDTO } from './dto/updateFaq.dto';
import { IdDTO } from './dto/id.dto';
import { SearchListDTO } from './dto/searchList.dto';
import { UserService } from '../user/user.service';
import { CreateFaqDTO } from './dto/createFaq.Dto';
import { BoardService } from '../board/board.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}
  // 查询列表的数据格式
  questionListFormat = [
    'question.questionId',
    'question.title',
    'question.createTime',
    'question.updateTime',
    'question.viewCount',
    'question.answerCount',
    'question.isSolve',
    'user.userId',
    'user.nickName',
    'board.boardId',
    'board.boardName',
  ];
  // 查询问题详情的数据格式
  questionDetail = [
    'question.questionId',
    'question.title',
    'question.content',
    'question.markdownContent',
    'question.createTime',
    'question.updateTime',
    'question.viewCount',
    'question.answerCount',
    'question.isSolve',
    'user.userId',
    'user.nickName',
    'board.boardId',
    'board.boardName',
  ];
  // 查询问题列表（全部）
  async findFaqList(faqListDto: FaqListDTO) {
    const { page = 1, pageSize = 10, boardId, faqState } = faqListDto;

    // 如果同时请求板块+解决状态
    if (boardId && faqState) {
      const getList = this.questionRepository
        .createQueryBuilder('question')
        .where('board.boardId = :id', { id: boardId })
        .where('question.isSolve = :isSolve', { isSolve: faqState })
        .select(this.questionListFormat)
        .leftJoin('question.user', 'user')
        .leftJoin('question.board', 'board')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      const [list, total] = await getList;
      const pagination = getPagination(total, pageSize, page);
      return {
        list,
        pagination,
      };
    } else if (boardId) {
      // 只根据板块信息请求
      const getList = this.questionRepository
        .createQueryBuilder('question')
        .where('board.boardId = :id', { id: boardId })
        .leftJoin('question.board', 'board')
        .leftJoin('question.user', 'user')
        .select(this.questionListFormat)
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      const [list, total] = await getList;
      const pagination = getPagination(total, pageSize, page);
      return {
        list,
        pagination,
      };
    } else if (faqState) {
      // 只根据解决状态请求
      const getList = this.questionRepository
        .createQueryBuilder('question')
        .where('question.isSolve = :isSolve', { isSolve: faqState })
        .leftJoin('question.board', 'board')
        .leftJoin('question.user', 'user')
        .select(this.questionListFormat)
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      const [list, total] = await getList;
      const pagination = getPagination(total, pageSize, page);
      return {
        list,
        pagination,
      };
    } else {
      // 不添加筛选条件的请求
      const getList = this.questionRepository
        .createQueryBuilder('question')
        .select(this.questionListFormat)
        .leftJoin('question.user', 'user')
        .leftJoin('question.board', 'board')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();

      const [list, total] = await getList;
      const pagination = getPagination(total, pageSize, page);
      return {
        list,
        pagination,
      };
    }
  }
  // 根据用户id查找问题列表
  async findQuestionByUserId(faqListDto: FaqListDTO) {
    const { page = 1, pageSize = 10, userId } = faqListDto;
    // 只根据解决状态请求
    const getList = this.questionRepository
      .createQueryBuilder('question')
      .where('user.userId = :userId', { userId: userId })
      .leftJoin('question.board', 'board')
      .leftJoin('question.user', 'user')
      .select(this.questionListFormat)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      list,
      pagination,
    };
  }

  // 查询问题详情
  async findFaqDetail(questionId: number) {
    const questionToUpdate = await this.questionRepository.findOneBy({
      questionId,
    });
    questionToUpdate.viewCount++;
    await this.questionRepository.save(questionToUpdate);
    const result = await this.questionRepository
      .createQueryBuilder('question')
      .select(this.questionDetail)
      .leftJoinAndSelect('question.user', 'user')
      .leftJoinAndSelect('question.board', 'board')
      .where('question.questionId = :questionId', { questionId: questionId })
      .getOne();
    return result;
  }
  // 根据问题Id查询问题
  async findQuestionById(questionId: number) {
    const result = await this.questionRepository.findOneBy({ questionId });
    return result;
  }

  //   创建问题
  async createFaq(createFaqDto: CreateFaqDTO, userInfo) {
    const user = await this.userService.findUserById(userInfo.userId);
    const board = await this.boardService.findBoardById(createFaqDto.boardId);
    if (!user) return '用户不存在';
    if (!board) return '板块不存在';
    const question = new Question();
    question.title = createFaqDto.title;
    question.content = createFaqDto.content;
    question.markdownContent = createFaqDto.markdownContent;
    question.user = user;
    question.board = board;
    const result = await this.questionRepository.save(question);
    return {
      result,
    };
  }

  //   修改问题
  async updateFaq(updateFaqDto: UpdateFaqDTO) {
    const { questionId, boardId } = updateFaqDto;
    const questionToUpdate = await this.questionRepository.findOneBy({
      questionId,
    });
    const board = await this.boardService.findBoardById(boardId);

    for (let key in updateFaqDto) {
      if (key !== 'questionId' && key !== 'boardId') {
        questionToUpdate[key] = updateFaqDto[key];
      }
    }
    questionToUpdate.board = board;
    const result = await this.questionRepository.save(questionToUpdate);
    return {
      result,
    };
  }
  // 更新回答数量
  async updateAnswerState(question) {
    return await this.questionRepository.save(question);
  }

  //   删除问题
  async deleteFaq(idDto: IdDTO) {
    const { questionId } = idDto;
    const question = await this.questionRepository.findOneBy({ questionId });
    const result = await this.questionRepository.remove(question);
    return result;
  }
  // 关键词查询
  async search(searchListDto: SearchListDTO) {
    const { page = 1, pageSize = 10, keywords } = searchListDto;
    const getList = this.questionRepository
      .createQueryBuilder('question')
      .select(this.questionListFormat)
      .leftJoin('question.user', 'user')
      .leftJoin('question.board', 'board')
      .where(`question.title LIKE :title`, { title: `%${keywords}%` })

      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);

    if (list.length > 0) {
      return {
        list,
        pagination,
      };
    } else {
      return [];
    }
  }

  // 修改问题状态

}
