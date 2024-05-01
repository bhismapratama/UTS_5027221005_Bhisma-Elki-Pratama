export class UserModelwithID {
  constructor(
    public name : string,
    public email : string,
    public id : string,
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
