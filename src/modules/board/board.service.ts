import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async createBoard(createBoardDto: CreateBoardDto) {
    const board = new Board();
    board.boardName = createBoardDto.boardName;
    return this.boardRepository.save(board);
  }

  async findAll() {
    return await this.boardRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
  async findBoardById(boardId: number) {
    return await this.boardRepository.findOneBy({ boardId });
  }
}
