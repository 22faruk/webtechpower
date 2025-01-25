import {Component, inject} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user-service/user.service';
import {LoginResponse} from '../../models/response/login-response';
import { Router } from '@angular/router';
import {SharedAntDesignModule} from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    SharedAntDesignModule
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  loginErrorMessage: string = '';

  userService = inject(UserService)
  router = inject(Router)

  constructor() { }

  login(){
    this.userService.loginUser(this.username, this.password).subscribe({
      next: (res:LoginResponse) => {
        console.log(res);
        localStorage.setItem('SessionID',res.data);
        this.router.navigate(['/dashboard'])
      },
      error: (err) =>{
        this.loginError=true;
        this.loginErrorMessage = err.error.message
        console.log(err)
      }
    });
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
