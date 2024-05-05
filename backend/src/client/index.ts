import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto/user'
import path from 'path'
import { UserID } from '../proto/userPackage/UserID'
import { User } from '../proto/userPackage/User'
import { UserWithID } from '../proto/userPackage/UserWithID'
import express, { Request, Response } from 'express'
import { LoginRequest } from '../proto/userPackage/LoginRequest';
import authCors from '../middleware/authCors'

const PROTO_PATH: string = "../../../proto/user.proto"
const PORT: number = 8080

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
  const client = new (grpcObj.userPackage.UserService)(
    `0.0.0.0:${PORT}`,
    grpc.credentials.createInsecure()
  );

  console.log(`Server running on port ${PORT}`);

  const app = express();
  app.use(express.json());
  app.use(authCors);

  app.get('/user', async (req: Request, res: Response) => {
    try {
      const response = await new Promise((resolve, reject) => {
        client.GetAllUser({}, (failed: any, success: any) => {
          if (failed) reject(failed);
          else resolve(success);
        });
      });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/user', async (req: Request, res: Response) => {
    try {
      const response = await new Promise((resolve, reject) => {
        const createInput: User = req.body
        client.createUser(createInput, (failed: any, success: any) => {
          if (failed) reject(failed);
          else resolve(success);
        });
      });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.patch('/user/:id', async (req: Request, res: Response) => {
    try {
      const user: UserWithID = {
        userId: { id: req.params.id },
        user: req.body
      };
      const response = await new Promise((resolve, reject) => {
        client.updateUser(user, (failed: any, success: any) => {
          if (failed) reject(failed);
          else resolve(success);
        });
      });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
      const userId: UserID = { id: req.params.id };
      const response = await new Promise((resolve, reject) => {
        client.deleteUser(userId, (failed: any, success: any) => {
          if (failed) reject(failed);
          else resolve(success);
        });
      });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/login', async (req: Request, res: Response) => {
    try {
      const loginInput: LoginRequest = req.body;
      const response = await new Promise((resolve, reject) => {
        client.Login(loginInput, (failed: any, success: any) => {
          if (failed) reject(failed);
          else resolve(success);
        });
      });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  const listen = 3001
  app.listen(listen, () => {
    console.log(`Client is started on port ${listen}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});
