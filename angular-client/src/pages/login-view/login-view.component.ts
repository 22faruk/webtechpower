import {Component, inject} from '@angular/core';

import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user-service/user.service';
import {LoginResponse} from '../../models/response/login-response';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    NzContentComponent,
    NzRowDirective,
    NzColDirective,
    NzTypographyComponent,
    NzDividerComponent,
    NzInputDirective,
    FormsModule,
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  loginErrorMessage: string = 'Invalid username or password. Please try again.';

  userservice = inject(UserService)

  constructor() { }

  login(){
    // this.userservice.loginUser(this.username).subscribe({
    //   next: (res:string) => {
    //     res;
    //   }
    // })
    this.userservice.loginUser(this.username, this.password).subscribe({
      next: (res:LoginResponse) => {
        console.log(res);
        localStorage.setItem('SessionID',res.data);//Send User to next site
      },
      error: (err) =>{
        this.loginError=true;
        console.log(err)
      }
    });
  }
}
