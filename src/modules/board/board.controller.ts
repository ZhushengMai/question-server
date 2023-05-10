import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('板块操作')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('createBoard')
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Post('all')
  findAll() {
    return this.boardService.findAll();
  }

  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Post(':id')
  remove(@Param('id') id: number) {
    return this.boardService.remove(id);
  }
}
