import { Component } from '@angular/core';

import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgIf} from '@angular/common';

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
  constructor() { }

  login(){

  }
}
