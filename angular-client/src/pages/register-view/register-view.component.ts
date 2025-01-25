import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user-service/user.service';
import {UserResponse} from '../../models/response/user-response';
import { Router } from '@angular/router';
import {SharedAntDesignModule} from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    SharedAntDesignModule
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
        this.registerErrorMessage = err.error.message
        console.log(err);
      }
    });
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
