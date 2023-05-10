import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';

import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, AnswerModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
