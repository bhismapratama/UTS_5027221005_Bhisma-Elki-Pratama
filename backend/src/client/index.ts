import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType} from '../proto/user'
import path from 'path'
import { UserID } from '../proto/userPackage/UserID'
import { User } from '../proto/userPackage/User'
import { UserWithID } from '../proto/userPackage/UserWithID'
import express, { Request, Response } from 'express'
import { LoginRequest } from '../proto/userPackage/LoginRequest';

const PROTO_PATH : string = "../../../proto/user.proto"
const PORT : number = 5001

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const protoBuf = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), options)
const grpcObj = (grpc.loadPackageDefinition(protoBuf) as unknown) as ProtoGrpcType

const client = new grpcObj.userPackage.UserService(
  `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)
client.waitForReady(deadline, (err) => {
  if(err) {
    console.error(err)
    return
  }
  onClientReady()
})


const onClientReady = () => {
  console.log(`Client running on port ${PORT}`)
  const corsMiddleware = require("../middleware/authCors");
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware);

  app.get('/user', (req : Request, res : Response) => {
    client.GetAll(
      {},
      (err, _res) => {
        if(err) {
          console.error(err)
          return
        }
        res.send(_res)
    })
  })
  
  app.post('/user', (req : Request, res : Response) => {
    const createInput : User = req.body
    const user : User = createInput 
    client.createUser(user, 
      (err, _res) => {
        if(err) {
          console.error(err)
          return
        }
        res.send(_res)
      }
    )
  })
  
  app.put('/user/:id', (req : Request, res : Response) => {
    const user : UserWithID = {
      userId : {
        id : req.params.id 
      },
      user : req.body 
    }

    client.updateUser(user, 
      (err, _res) => {
        if(err) {
          console.error(err)
          return
        }
        res.send(_res)
      }
    )
  })

  app.delete('/user/:id', (req : Request, res : Response) => {
    const userId : UserID = {
      id : req.params.id
    }
    client.deleteUser(userId, 
      (err, _res) => {
        if(err) {
          console.error(err)
          return
        }
        res.send(_res)
      }
    )
  })

  app.post('/login', (req: Request, res: Response) => {
    const loginInput: LoginRequest = req.body;
    client.Login(loginInput,
      (err, _res) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(_res);
      }
    );
  });

  app.listen(3000, () => {
    console.log("express is started")
  })

}
