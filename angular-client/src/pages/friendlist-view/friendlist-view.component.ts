import {Component, inject, OnInit} from '@angular/core';
import User from '../../models/user'
import FriendRequest from '../../models/friendrequest';
import {FriendService} from '../../services/friend-service/friend.service';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NgForOf} from '@angular/common';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-friendlist-view',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NzContentComponent,
    NzRowDirective,
    NzColDirective,
    NzTypographyComponent,
    NzDividerComponent,
    NgForOf,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './friendlist-view.component.html',
  styleUrl: './friendlist-view.component.css'
})
export class FriendlistViewComponent implements OnInit{
  friends:User[] = [];
  friendRequests:FriendRequest[] = [];
  userid !:number;
  friendid !:number;
  user !: User;

  friendService = inject(FriendService)
  constructor() {
  }

  ngOnInit() {
    this.userid = Number(localStorage.getItem('userId'))
    this.friendService.getFriendList(this.userid).subscribe({next: (data)=>{
      this.friends = data;
    },
    error: (err) =>{
      console.log(err)
    }})
   this.friendService.getFriendRequestList(this.userid).subscribe({next: (data)=>{
       this.friendRequests = data;
     },
     error: (err) =>{
       console.log(err)
     }})
  }
  removeFriend(userid:string)
  {
    this.friendService.deleteFriend(Number(userid),this.userid).subscribe();
    window.location.reload();
  }
  accept(friendrequestid:number)
  {
    this.friendService.acceptFriendRequest(friendrequestid).subscribe();
    window.location.reload();
  }
  decline(friendrequestid:number)
  {
    this.friendService.declineFriendRequest(friendrequestid).subscribe();
    window.location.reload();

  }
  addFriend(friendid: number)
  {
    this.friendService.sendFriendRequest(this.userid,friendid).subscribe({
      next: (response) => {
        if (response.status === 201) {
          console.log('Friend request sent successfully.');
        } else if (response.status === 400) {
          console.log('Friend request could not be sent. You may already be friends or the request is duplicate.');
        }
      }
    });
  }
  setFriendid(friendid:string){
    localStorage.setItem('friendid',friendid);
  }

}
