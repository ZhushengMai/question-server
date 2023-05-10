import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AnswerService } from '../answer/answer.service';
import { CommentListDTO } from './dto/commentList.dto';
import { getPagination } from '@/utils/getPagination.util';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly answerService: AnswerService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, userInfo) {
    const { userId } = userInfo;
    const { answerId, content } = createCommentDto;
    const user = await this.userService.findUserById(userId);
    const answer = await this.answerService.findAnswerById(answerId);
    const comment = new Comment();
    comment.answer = answer;
    comment.content = content;
    comment.user = user;
    return await this.commentRepository.save(comment);
  }

  async findAll(commentListDto: CommentListDTO) {
    const { page = 1, pageSize = 10, answerId } = commentListDto;
    const getList = await this.commentRepository
      .createQueryBuilder('comment')
      .where('answer.answerId = :id', { id: answerId })
      .leftJoin('comment.answer', 'answer')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      list,
      pagination,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
