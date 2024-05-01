import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../proto/user';
import { UserServiceHandlers } from '../proto/userPackage/UserService';
import { Empty } from '../proto/userPackage/Empty';
import { User } from '../proto/userPackage/User';
import { UserWithID } from '../proto/userPackage/UserWithID';
import { UserID } from '../proto/userPackage/UserID';
import { LoginRequest } from '../proto/userPackage/LoginRequest';
import { databaseConnection } from './services/db.service';
import { UserServerService } from './services/user.service';
import path from 'path';

const PROTO_PATH: string = "../../../proto/user.proto";
const PORT: number = 8080;

const loadProto = async () => {
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

  const protoBuf = await protoLoader.load(path.resolve(__dirname, PROTO_PATH), options);
  return grpc.loadPackageDefinition(protoBuf) as unknown as ProtoGrpcType;
};

const startServer = async () => {
  const grpcObj = await loadProto();
  const userService = grpcObj.userPackage;
  const server = new grpc.Server();

  server.addService(userService.UserService.service, {
    async GetAll(call, callback) {
      try {
        const users = await UserServerService.getAll();
        callback(null, users);
      } catch (error) {
        console.error(error);
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },
    async CreateUser(call, callback) {
      try {
        const user = call.request;
        const res = await UserServerService.createUser(user);
        callback(null, res);
      } catch (error) {
        console.error(error);
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },
    async UpdateUser(call, callback) {
      try {
        const user = call.request;
        const res = await UserServerService.updateUser(user);
        callback(null, res);
      } catch (error) {
        console.error(error);
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },
    async DeleteUser(call, callback) {
      try {
        const userId = call.request;
        const res = await UserServerService.deleteUser(userId);
        callback(null, res);
      } catch (error) {
        console.error(error);
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },
    async Login(call, callback) {
      try {
        const loginRequest = call.request;
        const res = await UserServerService.login(loginRequest);
        callback(null, res);
      } catch (error) {
        console.error(error);
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },
  } as UserServiceHandlers);

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Server started on port ${port}`);
    server.start();
  });
};

const main = async () => {
  try {
    await databaseConnection();
    await startServer();
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

main();
