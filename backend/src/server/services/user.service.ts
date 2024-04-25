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
  static async getAll(): Promise<Users | undefined> {
    try {
      const usersDocs = await collections.users?.find().toArray();
      const usersData = (usersDocs as unknown) as UserModelwithID[];
      let users: Users = {
        users: [],
      };
      usersData.forEach((user) => {
        users.users?.push({
          name: user.name,
          password: user.password,
          email: user.email,
          institution: user.institution,
        });
      });
      return users;
    } catch (err) {
      console.error("Error in getAll : \n", err);
    }
  }

  static async createUser(user: User): Promise<Response | undefined> {
    try {
      const res = await collections.users?.insertOne(user);
      if (res) {
        const _res: Response = {
          responseMsg: "Success creating new user",
        };
        return _res;
      } else {
        const _res: Response = {
          responseMsg: "Error when creating new user",
        };
        return _res;
      }
    } catch (err) {
      console.error("Error in createUser : \n", err);
    }
  }

  static async updateUser(user: UserWithID): Promise<Response | undefined> {
    try {
      const res = await collections.users?.updateOne(
        {
          _id: new ObjectId(user.userId?.id),
        },
        {
          $set: user.user,
        }
      );
      if (res) {
        const _res: Response = {
          responseMsg: "Success updating new user",
        };
        return _res;
      } else {
        const _res: Response = {
          responseMsg: "Error when updating new user",
        };
        return _res;
      }
    } catch (err) {
      console.error("Error in updateUser : \n", err);
    }
  }

  static async deleteUser(userId: UserID): Promise<Response | undefined> {
    try {
      const res = await collections.users?.deleteOne({
        _id: new ObjectId(userId.id),
      });
      if (res) {
        const _res: Response = {
          responseMsg: "Success deleting new user",
        };
        return _res;
      } else {
        const _res: Response = {
          responseMsg: "Error when deleting new user",
        };
        return _res;
      }
    } catch (err) {
      console.error("Error in deleteUser : \n", err);
    }
  }

  static async login(loginRequest: LoginRequest): Promise<Response | undefined> {
    try {
      const user = await collections.users?.findOne({
        email: loginRequest.email,
        password: loginRequest.password,
      });
      if (user) {
        const _res: Response = {
          responseMsg: `Selamat datang ${user.name}`,
        };
        return _res;
      } else {
        const _res: Response = {
          responseMsg: "Invalid email or password",
        };
        return _res;
      }
    } catch (err) {
      console.error("Error in login : \n", err);
    }
  }
}
