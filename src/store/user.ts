import { makeAutoObservable } from 'mobx';
import AppStore from './app';


export interface IUserSimple {
  name: {
    first: string;
    last: string;
  };
  isOnline: boolean;
  gender: string;
  uuid: string;
  job: string;
  picture: string;
  ban: {
    isBaned:boolean;
  }
}

export default class UserStore {

    currentUser:IUserSimple | undefined

    currentUserId:string | undefined

    oneUser:IUserSimple | undefined

    users:IUserSimple[] | undefined

    isAuthenticated:boolean = false;

    setCurrentUser(user:IUserSimple) {
      console.log(user)
      this.currentUser = user
    }

    setCurrentUserId(uuid:string) {
      this.currentUserId = uuid
    }

    setAuth(bool:boolean) {
      this.isAuthenticated = bool
    }

    setUsers(users:IUserSimple[]){
      this.users = users;
    }

    setOneUser(user:IUserSimple){
      this.oneUser = user;
    }

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }
}