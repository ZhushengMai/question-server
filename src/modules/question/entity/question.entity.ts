import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Board } from 'src/modules/board/entities/board.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  questionId: number;
  // 作者ID
  // @Column()
  // authorId: number;
  //   标题
  @Column()
  title: string;
  //   内容
  @Column('text')
  content: string;
  //   markdown内容
  @Column('text')
  markdownContent: string;
  // 注册时间
  @CreateDateColumn()
  createTime: Date;
  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;
  // 阅读量
  @Column({ default: 0 })
  viewCount: number;
  // 回答量
  @Column({ default: 0 })
  answerCount: number;
  // 是否被解决
  @Column({ default: false })
  isSolve: boolean;
  // 建立与回答表的外键，同时启用级联关系
  @OneToMany((type) => Answer, (answer) => answer.question, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  answers: Answer[];
  // 用户外键
  @ManyToOne((type) => User, (user) => user.questions)
  @JoinColumn()
  user: User;

  // 板块外键;
  @ManyToOne((type) => Board, (board) => board.questions)
  @JoinColumn()
  board: Board;
}
