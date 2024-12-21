import {Component, Inject} from '@angular/core';
import AddTodoComponent from '../../components/add-todo/add-todo.component';
import {NgForOf, NgIf} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import TodoCardComponent from '../../components/todo-card/todo-card.component';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {UserService} from '../../services/user-service/user.service';
import {UserResponse} from '../../models/response/user-response';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [
    AddTodoComponent,
    NgForOf,
    NgIf,
    NzColDirective,
    NzContentComponent,
    NzDividerComponent,
    NzRowDirective,
    TodoCardComponent,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzTypographyComponent
  ],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.css'
})
export class RegisterViewComponent {
  username: string = '';
  name: string = '';
  password: string = '';
  registerError: boolean = false;
  registerErrorMessage: string = 'Username already taken. Please try again.';

  userservice = Inject(UserService)

  register(){
    this.userservice.registerUser(this.username, this.name).subscribe({
      next: (res:UserResponse) => {
        console.log(res);
      }
    });
  }
}
