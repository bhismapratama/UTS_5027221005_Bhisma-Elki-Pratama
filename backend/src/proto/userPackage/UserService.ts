// Original file: ../proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _userPackage_Empty, Empty__Output as _userPackage_Empty__Output } from '../userPackage/Empty';
import type { LoginRequest as _userPackage_LoginRequest, LoginRequest__Output as _userPackage_LoginRequest__Output } from '../userPackage/LoginRequest';
import type { Response as _userPackage_Response, Response__Output as _userPackage_Response__Output } from '../userPackage/Response';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';
import type { UserID as _userPackage_UserID, UserID__Output as _userPackage_UserID__Output } from '../userPackage/UserID';
import type { UserWithID as _userPackage_UserWithID, UserWithID__Output as _userPackage_UserWithID__Output } from '../userPackage/UserWithID';
import type { Users as _userPackage_Users, Users__Output as _userPackage_Users__Output } from '../userPackage/Users';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _userPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userPackage_User, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userPackage_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userPackage_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userPackage_User, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userPackage_User, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  
  DeleteUser(argument: _userPackage_UserID, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserID, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserID, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserID, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserID, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserID, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserID, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserID, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  
  GetAllUser(argument: _userPackage_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  GetAllUser(argument: _userPackage_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  GetAllUser(argument: _userPackage_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  GetAllUser(argument: _userPackage_Empty, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  getAllUser(argument: _userPackage_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  getAllUser(argument: _userPackage_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  getAllUser(argument: _userPackage_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  getAllUser(argument: _userPackage_Empty, callback: grpc.requestCallback<_userPackage_Users__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  
  UpdateUser(argument: _userPackage_UserWithID, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userPackage_UserWithID, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userPackage_UserWithID, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userPackage_UserWithID, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userPackage_UserWithID, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userPackage_UserWithID, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userPackage_UserWithID, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userPackage_UserWithID, callback: grpc.requestCallback<_userPackage_Response__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_userPackage_User__Output, _userPackage_Response>;
  
  DeleteUser: grpc.handleUnaryCall<_userPackage_UserID__Output, _userPackage_Response>;
  
  GetAllUser: grpc.handleUnaryCall<_userPackage_Empty__Output, _userPackage_Users>;
  
  Login: grpc.handleUnaryCall<_userPackage_LoginRequest__Output, _userPackage_Response>;
  
  UpdateUser: grpc.handleUnaryCall<_userPackage_UserWithID__Output, _userPackage_Response>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_userPackage_User, _userPackage_Response, _userPackage_User__Output, _userPackage_Response__Output>
  DeleteUser: MethodDefinition<_userPackage_UserID, _userPackage_Response, _userPackage_UserID__Output, _userPackage_Response__Output>
  GetAllUser: MethodDefinition<_userPackage_Empty, _userPackage_Users, _userPackage_Empty__Output, _userPackage_Users__Output>
  Login: MethodDefinition<_userPackage_LoginRequest, _userPackage_Response, _userPackage_LoginRequest__Output, _userPackage_Response__Output>
  UpdateUser: MethodDefinition<_userPackage_UserWithID, _userPackage_Response, _userPackage_UserWithID__Output, _userPackage_Response__Output>
}
