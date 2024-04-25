// Original file: ../proto/user.proto

import type { UserId as _userPackage_UserID, UserId__Output as _userPackage_UserID__Output } from '../userPackage/UserId';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface UserWithID {
  'userId'?: (_userPackage_UserID | null);
  'user'?: (_userPackage_User | null);
}

export interface UserWithID__Output {
  'userId'?: (_userPackage_UserID__Output);
  'user'?: (_userPackage_User__Output);
}
