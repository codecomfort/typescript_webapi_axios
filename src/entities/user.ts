export interface UserData {
  name: string;
  age: number;
}
export class User {
  public name: string;
  public age: number;

  // Immutable の疑似実装。正しくは typescript-immutable のリポジトリを参照
  with(userData: Partial<UserData>): User {
    const user = new User();
    user.name = userData.name;
    user.age = userData.age;
    return user;
  }
}