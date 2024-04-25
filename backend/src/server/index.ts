import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType} from '../proto/user'
import { UserServiceHandlers } from '../proto/userPackage/UserService'
import { Empty } from '../proto/userPackage/Empty'
import { Users } from '../proto/userPackage/Users'
import { User } from '../proto/userPackage/User'
import { databaseConnection } from './services/db.service' 
import path from 'path'
import { UserServerService } from './services/user.service'
import { Response } from '../proto/userPackage/Response'
import { UserWithID } from '../proto/userPackage/UserWithID'
import { UserID } from '../proto/userPackage/UserID'
import { LoginRequest } from '../proto/userPackage/LoginRequest'

const PROTO_PATH : string = "../../../proto/user.proto"
const PORT : number = 5001

const options : protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const protoBuf : protoLoader.PackageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), options)
const grpcObj : ProtoGrpcType = (grpc.loadPackageDefinition(protoBuf) as unknown) as ProtoGrpcType
const userService = grpcObj.userPackage

const main = () => {
  databaseConnection().then(() => {
    const server = getServer()
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
      (err : Error | null, port : number) => {
        if(err) {
          console.error(err.message)
          return
        }
        console.log(`Server started on port ${port}`)
        
        server.start()
      }
    )
  })
}

const getServer = () => {
  const server : grpc.Server = new grpc.Server()
  server.addService(userService.UserService.service, {
    'GetAll' : (call : grpc.ServerUnaryCall<Empty, Users>, callback : grpc.sendUnaryData<Users>) => {
      console.log('server requested')
      UserServerService.getAll().then((users : Users | undefined) => {
        callback(null, users)
      }) 
    },
    'CreateUser' : (call : grpc.ServerUnaryCall<User, Response>, callback : grpc.sendUnaryData<Response>) => {
      const user = call.request
      UserServerService.createUser(user).then((res : Response | undefined) => {
        callback(null, res)
      })
    },
    'UpdateUser' : (call : grpc.ServerUnaryCall<UserWithID, Response>, callback : grpc.sendUnaryData<Response>) => {
      const user = call.request
      UserServerService.updateUser(user).then((res : Response | undefined) => {
        callback(null, res)
      })
    },
    'DeleteUser' : (call : grpc.ServerUnaryCall<UserID, Response>, callback : grpc.sendUnaryData<Response>) => {
      const userId = call.request
      UserServerService.deleteUser(userId).then((res : Response | undefined) => {
        callback(null, res)
      })
    },
    'Login': (call: grpc.ServerUnaryCall<LoginRequest, Response>, callback: grpc.sendUnaryData<Response>) => {
      const loginRequest = call.request
      UserServerService.login(loginRequest).then((res: Response | undefined) => {
        callback(null, res)
      })
    }
  } as UserServiceHandlers ) 
  return server
}

main()
