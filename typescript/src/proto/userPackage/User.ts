// Original file: ../proto/user.proto

import type { Long } from '@grpc/proto-loader';

export interface User {
  'email'?: (string);
  'name'?: (string);
  'password'?: (string);
  'age'?: (number | string | Long);
}

export interface User__Output {
  'email'?: (string);
  'name'?: (string);
  'password'?: (string);
  'age'?: (Long);
}
