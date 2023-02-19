import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from 'src/store/reducer/todo.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoEffects } from 'src/store/effects/todo.effect';
import { reducers } from 'src/store';
import { TodosComponent } from './todos/todos.component';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { MaterialModule } from 'src/lib/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FilterResult } from 'src/util/filter.pipe';

@NgModule({
  declarations: [
    FilterResult,
    AppComponent, 
    TodosComponent,
    ListItemComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Todo app',
      maxAge: 25,
    }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
