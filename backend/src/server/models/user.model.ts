import { ObjectId } from "mongodb";

export class UserModelwithID {
  constructor(
    public name : string,
    public email : string,
    public id : ObjectId,
    public password : string,
    public institution: string 
  ) {}
}

export class UserModel {
  constructor(
    public name : string,
    public email : string,
    public password : string,
    public institution: string
  ) {}
}
