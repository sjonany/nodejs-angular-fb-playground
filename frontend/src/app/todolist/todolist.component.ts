import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.sass']
})
export class TodolistComponent implements OnInit {

  public todos : any = [];
  newTodoContent : string = '';
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.getTodos().then(result => {
      this.todos = result;
    }).catch(() => this.todos = []);
  }

  submit() {
    if (this.newTodoContent.length == 0) {
      return;
    }
    this.todoService.addTodo(this.newTodoContent).then(result => {
      this.newTodoContent = '';
      this.refreshTodos();
    }).catch(() => this.newTodoContent = '');
  }
}
