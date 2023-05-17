import { Comment } from '@/modules/comment/entities/comment.entity';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Question } from 'src/modules/question/entity/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  //   用户名
  @Column({ unique: true })
  username: string;
  //   加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;

  //   用户昵称
  @Column('text')
  nickName: string;
  //   用户邮箱
  @Column({ unique: true })
  email: string;
  // 用户简介
  @Column({ default: '此用户还没有填写简介', length: 20 })
  introduction: string;
  // 城市
  @Column({ default: '未知' })
  city: string;
  //   创建时间
  @CreateDateColumn()
  createTime: Date;
  //   更新时间
  @UpdateDateColumn()
  updateTime: Date;
  // 外键-回答
  @OneToMany((type) => Answer, (answer) => answer.user)
  answers: Answer[];
  // 外键-问题
  @OneToMany((type) => Question, (question) => question.user)
  questions: Question[];
  // 外键-评论
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];
}
