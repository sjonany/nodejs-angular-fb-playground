import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

declare const FB:any;

@Injectable()
export class TodoService {

  constructor(private http: AuthHttp) {}

  getTodos() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/api/v1/todo`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

  addTodo(todoContent: string) {
    return new Promise((resolve, reject) => {
      return this.http.post(`http://localhost:3000/api/v1/todo`,
          {todo_content: todoContent}).toPromise().then(response => {
        resolve();
      }).catch(() => reject());
    });
  }
}