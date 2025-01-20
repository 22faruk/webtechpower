import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {UserService} from '../../services/user-service/user.service';
import {UserResponse} from '../../models/response/user-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [
    NgIf,
    NzColDirective,
    NzContentComponent,
    NzDividerComponent,
    NzRowDirective,
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
  email: string= '';
  password: string = '';
  registerError: boolean = false;
  registerErrorMessage: string = 'Username already taken. Please try again.';

  userService = inject(UserService)
  router = inject(Router)

  constructor() { }

  register(){
    this.userService.registerUser(this.username, this.name, this.email, this.password).subscribe({
      next: (res:UserResponse) => {
        console.log(res);
      },
      error: (err) => {
        this.registerError=true;
        console.log(err);
      }
    });
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
