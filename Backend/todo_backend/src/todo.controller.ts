import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body('text') text: string) {
    return this.todoService.create(text);
  }

  @Patch(':id')
  toggle(@Param('id') id: string) {
    return this.todoService.toggle(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }
}