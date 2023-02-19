import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITodo } from 'src/interfaces/todo.interface';
import { AppState, selectAllTodos } from 'src/store';
import { TodoActions } from 'src/store/actions';

@Component({
  selector: 'app-root',
  template: `
   <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
