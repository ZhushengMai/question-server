import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Question } from 'src/modules/question/entity/question.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  AfterInsert,
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  answerId: number;
  @Column('text')
  content: string;

  @Column('text')
  markdownContent: string;
  @Column({ default: false })
  isAdopt: boolean;

  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;

  // 问题外键
  @ManyToOne((type) => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @ManyToOne((type) => User, (user) => user.answers)
  @JoinColumn()
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.answer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];

  @AfterInsert()
  addAnswerCount() {
    this.question.answerCount++;
  }

  @BeforeRemove()
  delAnswerCount() {
    this.question.answerCount--;
  }

  // 删除实体方法
  async remove(): Promise<this> {
    if (this.question && this.question.answerCount > 0) {
      this.question.answerCount -= 1;
      await this.question.save();
    }
    return await super.remove();
  }
}
function moment() {
  throw new Error('Function not implemented.');
}
