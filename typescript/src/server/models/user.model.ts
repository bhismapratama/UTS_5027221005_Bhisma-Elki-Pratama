import { ObjectId } from "mongodb";

export class UserModelwithID {
  constructor(
    public name : string,
    public email : string,
    public id : ObjectId,
    public age : number,
    public password : string
  ) {}
}

export class UserModel {
  constructor(
    public name : string,
    public email : string,
    public age : number,
    public password : string
  ) {}
}
