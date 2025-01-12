import { Routes } from '@angular/router';
import {TodoListComponent} from '../pages/todo-list/todo-list.component';
import {RegisterViewComponent} from '../pages/register-view/register-view.component';
import {LoginViewComponent} from '../pages/login-view/login-view.component';
import {FriendlistViewComponent} from '../pages/friendlist-view/friendlist-view.component';
import {FlashcardsViewComponent} from '../pages/flashcards-view/flashcards-view.component';
import {QuizComponent} from '../pages/quiz/quiz.component';
import {DashboardViewComponent} from '../pages/dashboard-view/dashboard-view.component';

export const routes: Routes = [
  {path:'login',component:LoginViewComponent},
  {path:'register',component:RegisterViewComponent},
  {path:'friends',component:FriendlistViewComponent},
  {path:'flashcards',component:FlashcardsViewComponent},
  {path:'quiz',component:QuizComponent},
  {path:'dashboard', component:DashboardViewComponent},
  {path:'',component:LoginViewComponent},
];
