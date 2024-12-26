import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import User from '../../models/user';
import FriendRequest from '../../models/friendrequest';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  http = inject(HttpClient);

  constructor() { }
  sendFriendRequest(senderid:number, receiverid:number) {
    return this.http.post<any>(`${environment.api}/sendfriendrequest/${senderid}/${receiverid}`,"",
      {observe: 'response' as 'response'});
  }
  acceptFriendRequest(friendrequestid:number){
    return this.http.post(`${environment.api}/acceptfriendrequest/${friendrequestid}`,"");
  }

  declineFriendRequest(friendrequestid:number){
    return this.http.delete(`${environment.api}/declinefriendrequest/${friendrequestid}`);
  }
  deleteFriend(userid1:number,userid2:number){
    return this.http.delete(`${environment.api}/deletefriendbyusers/${userid1}/${userid2}`);
  }
  getFriendList(userid:number){
    return this.http.get<User[]>(`${environment.api}/getfriends/${userid}`);
  }
  getFriendRequestList(userid:number){
    return this.http.get<FriendRequest[]>(`${environment.api}/userfriendrequestlist/${userid}`);
  }
}
