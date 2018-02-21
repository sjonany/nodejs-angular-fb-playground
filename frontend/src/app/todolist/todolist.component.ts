import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.sass']
})
export class TodolistComponent implements OnInit {

  public todos : any = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().then(result => {
      this.todos = result;
    }).catch(() => this.todos = []);
  }
}
