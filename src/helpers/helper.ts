import User from "../models/user";

export class Helper {
  public static defaultUser() {
    const _user: User = new User();
    _user.username = "user_default";
    _user.id = 1;
    return _user;
  }
}
