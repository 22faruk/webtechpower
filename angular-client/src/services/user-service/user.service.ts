import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserResponse} from '../../models/response/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  constructor(){}

  registerUser(username:string, name:string):Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.api}/users/register`,
      {
        username,
        name,
      })
  }
}
