import { User } from '@/modules/user/entity/user.entity';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentID: number;

  @Column('text')
  content: string;
  @CreateDateColumn()
  createTime: Date;
  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn()
  user: User;
  @ManyToOne((type) => Answer, (answer) => answer.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  answer: Answer;
}
