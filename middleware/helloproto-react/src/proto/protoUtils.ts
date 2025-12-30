import * as protobuf from 'protobufjs';

// 定义TypeScript接口以匹配proto消息类型
export interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
  role: 'GUEST' | 'USER' | 'ADMIN';
  hobbies: string[];
}

export interface IUserList {
  users: IUser[];
}

// Proto加载器类
export class ProtoLoader {
  private static instance: ProtoLoader;
  private root: protobuf.Root | null = null;

  private constructor() {}

  public static getInstance(): ProtoLoader {
    if (!ProtoLoader.instance) {
      ProtoLoader.instance = new ProtoLoader();
    }
    return ProtoLoader.instance;
  }

  public async load(): Promise<void> {
    if (!this.root) {
      // 在浏览器环境中，我们需要手动加载proto定义
      this.root = new protobuf.Root();
      
      // 手动定义消息类型
      const user = new protobuf.Type("User")
        .add(new protobuf.Field("id", 1, "string"))
        .add(new protobuf.Field("name", 2, "string"))
        .add(new protobuf.Field("age", 3, "int32"))
        .add(new protobuf.Field("email", 4, "string"))
        .add(new protobuf.Field("role", 5, "Role"))
        .add(new protobuf.Field("hobbies", 6, "string", "repeated"));

      const role = new protobuf.Enum("Role", {
        GUEST: 0,
        USER: 1,
        ADMIN: 2
      });

      const userList = new protobuf.Type("UserList")
        .add(new protobuf.Field("users", 1, "User", "repeated"));

      this.root.define("tutorial").add(user).add(role).add(userList);
    }
  }

  public getType<T>(typeName: string): protobuf.Type {
    if (!this.root) {
      throw new Error('Proto file not loaded. Call load() first.');
    }
    const type = this.root.lookupType(typeName);
    if (!type) {
      throw new Error(`Type ${typeName} not found in proto file.`);
    }
    return type;
  }

  // 序列化方法
  public serialize<T extends Record<string, any>>(typeName: string, data: T): Uint8Array {
    const type = this.getType(typeName);
    const message = type.create(data);
    return type.encode(message).finish();
  }

  // 反序列化方法
  public deserialize<T>(typeName: string, buffer: Uint8Array): T {
    const type = this.getType(typeName);
    return type.decode(buffer) as unknown as T;
  }
}

// 创建示例数据
export const createSampleUser = (): IUser => ({
  id: '1',
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  role: 'USER',
  hobbies: ['reading', 'coding', 'gaming']
});

export const createSampleUserList = (): IUserList => ({
  users: [
    createSampleUser(),
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      email: 'jane@example.com',
      role: 'ADMIN',
      hobbies: ['painting', 'traveling']
    }
  ]
});