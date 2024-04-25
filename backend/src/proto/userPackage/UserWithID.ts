// Original file: ../proto/user.proto

import type { UserID as _userPackage_UserID, UserID__Output as _userPackage_UserID__Output } from '../userPackage/UserID';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface UserWithID {
  'userId'?: (_userPackage_UserID | null);
  'user'?: (_userPackage_User | null);
}

export interface UserWithID__Output {
  'userId'?: (_userPackage_UserID__Output);
  'user'?: (_userPackage_User__Output);
}
