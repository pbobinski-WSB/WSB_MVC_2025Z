import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private storage: Todo[] = [];

  // create(todo: Todo): void {
  //   const currentMaxId = Math.max(...this.storage.map((t: Todo) => t.id));
  //   todo.id = currentMaxId + 1;
  //   this.storage.push(todo);
  // }


create(todo: Todo): Todo {
  let maxId = 0;
  // Sprawdź, czy tablica nie jest pusta
  if (this.storage && this.storage.length > 0) {
    maxId = Math.max(...this.storage.map((t) => t.id));
  }

  // Stwórz nowy obiekt, aby nie modyfikować tego, co przyszło w żądaniu
  const newTodo = {
    ...todo,
    id: maxId + 1, // Nadaj nowe, poprawne ID
  };

  this.storage.push(newTodo);
  
  // Zwróć nowo stworzony obiekt
  return newTodo;
}

  createAll(todos: Todo[]): string {
    this.storage = todos;
    return "OK"
  }

  findAll(): Todo[] {
    return this.storage;
  }

  findOne(id: number): Todo | undefined{
    return this.storage.find((t: Todo) => t.id === id);
  }

  update(id: number, todo: Todo): void {
    const index = this.storage.findIndex((t: Todo) => t.id === id);
    this.storage[index] = todo;
    }

  remove(id: number): void {
    const index = this.storage.findIndex((t: Todo) => t.id === id);
    this.storage.splice(index, 1);
  }

}
