import { Routes } from '@angular/router';
import {TodoListComponent} from '../pages/todo-list/todo-list.component';
import {RegisterViewComponent} from '../pages/register-view/register-view.component';
import {LoginViewComponent} from '../pages/login-view/login-view.component';
import {FriendlistViewComponent} from '../pages/friendlist-view/friendlist-view.component';

export const routes: Routes = [
  {path:'login',component:LoginViewComponent},
  {path:'register',component:RegisterViewComponent},
  {path:'friends',component:FriendlistViewComponent},
  {path:'',component:LoginViewComponent},
];
