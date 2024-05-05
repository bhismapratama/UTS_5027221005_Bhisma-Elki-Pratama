// Original file: ../proto/user.proto

import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface Response {
  'message'?: (string);
  'code'?: (number);
  'userId'?: (string);
  'users'?: (_userPackage_User | null);
}

export interface Response__Output {
  'message'?: (string);
  'code'?: (number);
  'userId'?: (string);
  'users'?: (_userPackage_User__Output);
}
