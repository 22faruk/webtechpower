import User from "./user";

export default interface IFriendRequest {
  friendRequestId: number;
  senderId:number;
  user: User
}
