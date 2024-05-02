import { User } from "../../proto/userPackage/User";
import { Users } from "../../proto/userPackage/Users";
import { Response } from "../../proto/userPackage/Response";
import { UserID } from "../../proto/userPackage/UserID";
import { UserModelwithID } from "../models/user.model";
import { collections } from "./db.service";
import { UserWithID } from "../../proto/userPackage/UserWithID";
import { ObjectId } from "mongodb";
import { LoginRequest } from "../../proto/userPackage/LoginRequest";

export class UserServerService {
  static async getAll(): Promise<Users> {
    try {
      const usersDocs = await collections.users?.find().toArray();
      if (!usersDocs) throw new Error("No users found");

      const usersData = usersDocs.map((userDoc) => ({
        id: userDoc._id.toString(),
        name: userDoc.name,
        password: userDoc.password,
        email: userDoc.email,
        institution: userDoc.institution,
      })) as UserModelwithID[];
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
      await collections.users?.insertOne(user);
      return {
        code: 200,
        responseMsg: "Success creating new user",
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
          responseMsg: "Success updating user",
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
          responseMsg: "Success deleting user"
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
      if (user)
        return { responseMsg: `Welcome ${user.name}`, code: 200, userId: user._id.toString()  };
      throw new Error("Invalid email or password");
    } catch (err) {
      console.error("Error in login:", err);
      throw new Error("Login failed");
    }
  }
}
