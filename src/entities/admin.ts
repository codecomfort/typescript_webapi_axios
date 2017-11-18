export interface AdminData {
  name: string;
  age: number;
  role: number;
}
export class Admin {
  public name: string;
  public age: number;
  public role: number;

  // Immutable の疑似実装。正しくは typescript-immutable のリポジトリを参照
  with(data: Partial<AdminData>): Admin {
    const admin = new Admin();
    admin.name = data.name;
    admin.age = data.age;
    admin.role = data.role;
    return admin;
  }
}