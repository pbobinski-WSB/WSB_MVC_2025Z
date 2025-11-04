import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Logger, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

@Post()
  // Dobrą praktyką jest zwrócenie statusu 201 Created
  @HttpCode(HttpStatus.CREATED) 
  // Zmień typ zwracany z void na Todo
  create(@Body() todo: Todo): Todo {
    this.logger.log('Handling create() request...');
    // Zwróć to, co zwróci serwis (czyli kompletny obiekt Todo z nowym ID)
    return this.todoService.create(todo);
  }

  @Get('create')
  createGet(@Query() params: any): Todo {
    this.logger.log('Handling create() blueprint request...');
    const todo = {
      id: params.id,
      label: params.label,
      complete: params.complete,
    };
    return this.todoService.create(todo);
  }

  @Get('mock')
  createMock(): string {
    this.logger.log('Handling createMock() blueprint request...');
    const todos = [
      {
        id: 1,
        label: 'Task numer 1',
        complete: false,
      },
      {
        id: 2,
        label: 'Task numer 2',
        complete: true,
      },
      {
        id: 3,  
        label: 'Task numer 3',
        complete: false,
      },
    ];
    this.logger.log(todos);
    return this.todoService.createAll(todos);
  }

  @Get()
  findAll(): Todo[] {
    this.logger.log('Handling findAll() request...');
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    this.logger.log('Handling findOne() request with id=' + id + '...');
    const todo = this.todoService.findOne(id); // todo jest teraz typu Todo | undefined

    if (!todo) {
      this.logger.warn(`Todo with id=${id} not found.`);
      throw new NotFoundException(`Todo with id ${id} not found`); // NestJS automatycznie zamieni to na odpowiedź HTTP 404
    }

    this.logger.log(`Found todo: ${JSON.stringify(todo)}`);
    return todo;
  }
    

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): void {
    this.logger.log('Handling update() request with id=' + id + '...');
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.logger.log('Handling remove() request with id=' + id + '...');
    return this.todoService.remove(id);
  }
}
