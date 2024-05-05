import { Users } from "../../proto/userPackage/Users";
import { Response } from "../../proto/userPackage/Response";
import { UserID } from "../../proto/userPackage/UserID";
import { collections } from "./db.service";
import { UserWithID } from "../../proto/userPackage/UserWithID";
import { ObjectId } from "mongodb";
import { LoginRequest } from "../../proto/userPackage/LoginRequest";
import { User } from "../../proto/userPackage/User";

export class UserServerService {
  static async getAllUser(): Promise<Users> {
    try {
      const dataUsers = await collections.users?.find().toArray()
      if (!dataUsers) throw new Error("No users found");

      const usersData = dataUsers.map((item) => ({
        name: item.name,
        password: item.password,
        email: item.email,
        institution: item.institution,
      })) as User[];
      return {
        users: usersData
      };
    } catch (err) {
      console.error("Error in getAll:", err);
      throw new Error("Failed to fetch users");
    }
  }

  static async createUser(user: User): Promise<Response> {
    try {
      const datas = {
        name: user.name,
        email: user.email,
        password: user.password,
        institution: user.institution
      }
      await collections.users?.insertOne(datas);
      return {
        code: 200,
        message: "Success creating new user",
        users: datas
      };
    } catch (err) {
      console.error("Error in createUser:", err);
      throw new Error("Failed to create user");
    }
  }

  static async updateUser(user: UserWithID): Promise<Response> {
    try {
      const res = await collections.users?.updateOne(
        { _id: new ObjectId(user.userId?.id) },
        { $set: user.user }
      );
      if (res?.modifiedCount)
        return {
          code: 200,
          message: "Success updating user",
          users: user.user
        };
      throw new Error("User not found");
    } catch (err) {
      console.error("Error in updateUser:", err);
      throw new Error("Failed to update user");
    }
  }

  static async deleteUser(userId: UserID): Promise<Response> {
    try {
      const res = await collections.users?.deleteOne({
        _id: new ObjectId(userId.id),
      });
      if (res?.deletedCount === 1)
        return {
          code: 200,
          message: "Success deleting user",
          userId: userId.id,
        };
      throw new Error("User not found");
    } catch (err) {
      console.error("Error in deleteUser:", err);
      throw new Error("Failed to delete user");
    }
  }

  static async login(loginRequest: LoginRequest): Promise<Response> {
    try {
      const user = await collections.users?.findOne({
        email: loginRequest.email,
        password: loginRequest.password,
      });
      const datas = {
        name: user?.name,
        email: user?.email,
        password: user?.password,
        institution: user?.institution
      }
      if (user)
        return { 
          code: 200, 
          message: `Welcome ${user.name}`, 
          userId: user._id.toString(),
          users: datas
        };
      throw new Error("Invalid email or password");
    } catch (err) {
      console.error("Error in login:", err);
      throw new Error("Login failed");
    }
  }
}
