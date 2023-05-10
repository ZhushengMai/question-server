import { Question } from 'src/modules/question/entity/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;
  @Column({ unique: true })
  boardName: string;

  @OneToMany((type) => Question, (question) => question.board)
  questions: Question[];
}
