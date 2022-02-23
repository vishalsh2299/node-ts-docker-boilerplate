import User from "../models/user";

export class CommonService {
  public user_current: User;

  constructor(_user: any) {
    this.user_current = _user;
  }
}
